import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import { Clock, MapPin } from 'lucide-react';

type Scope = ReturnType<typeof createScope>;

interface ClockState {
  time: string;
  date: string;
  city: string | null;
  timeZone: string;
}

/** Turns an IANA timezone id like "Asia/Kolkata" into a readable fallback city name. */
function cityFromTimeZone(tz: string): string {
  const parts = tz.split('/');
  const last = parts[parts.length - 1] || tz;
  return last.replace(/_/g, ' ');
}

function getFormatted(timeZone: string): { time: string; date: string } {
  const now = new Date();
  const time = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone,
  }).format(now);
  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(now);
  return { time, date };
}

export default function LiveClock() {
  const timeZone = useRef(
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  ).current;

  const [state, setState] = useState<ClockState>(() => ({
    ...getFormatted(timeZone),
    city: cityFromTimeZone(timeZone),
    timeZone,
  }));

  const rootRef = useRef<HTMLDivElement | null>(null);
  const scopeRef = useRef<Scope | null>(null);
  const lastSecondRef = useRef<string>('');

  // Tick every second
  useEffect(() => {
    const tick = () => {
      setState((prev) => ({ ...prev, ...getFormatted(prev.timeZone) }));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Best-effort geolocation -> reverse geocode for a real city name.
  // Falls back silently to the timezone-derived city on denial/error/offline.
  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    let cancelled = false;
    const timeoutId = window.setTimeout(() => {
      // don't hang the UI waiting on a permission prompt
    }, 6000);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (!res.ok) return;
          const data = await res.json();
          const city: string | undefined =
            data.city || data.locality || data.principalSubdivision;
          if (city && !cancelled) {
            setState((prev) => ({ ...prev, city }));
          }
        } catch {
          // silent fallback — timezone-derived city stays
        }
      },
      () => {
        // permission denied or unavailable — keep timezone fallback
      },
      { timeout: 5000, maximumAge: 10 * 60 * 1000 }
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Anime.js: subtle pulse on the whole pill + flip on each second change
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    scopeRef.current = createScope({ root }).add((self) => {
      self?.add('pulse', () => {
        animate('.gakr-clock-seconds', {
          scale: [1, 1.18, 1],
          duration: 380,
          ease: 'out(3)',
        });
      });
      self?.add('shine', () => {
        animate('.gakr-clock-shine', {
          left: ['-40%', '140%'],
          duration: 750,
          ease: 'inOut(2)',
        });
      });
      animate('.gakr-clock-colon', {
        opacity: [1, 0.25, 1],
        duration: 1000,
        loop: true,
        ease: 'inOut(2)',
      });
      animate(root, {
        opacity: [0, 1],
        translateY: [-8, 0],
        duration: 600,
        ease: 'out(3)',
      });
    });
    return () => scopeRef.current?.revert();
  }, []);

  useEffect(() => {
    const seconds = state.time.split(':')[2];
    if (seconds && seconds !== lastSecondRef.current) {
      lastSecondRef.current = seconds;
      scopeRef.current?.methods.pulse?.();
    }
  }, [state.time]);

  const [hm, meridiem] = (() => {
    const match = state.time.match(/^(\d{1,2}:\d{2}):(\d{2})\s?(AM|PM)?$/i);
    if (!match) return [state.time, ''];
    return [`${match[1]}`, match[3] ?? ''];
  })();
  const seconds = state.time.split(':')[2]?.replace(/\s?(AM|PM)/i, '') ?? '';

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => scopeRef.current?.methods.shine?.()}
      className="gakr-clock relative flex items-center gap-1.5 sm:gap-2 md:gap-2.5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-white/5 border border-dark-border backdrop-blur-sm select-none max-w-[52vw] xs:max-w-[46vw] sm:max-w-none overflow-hidden transition-colors duration-300 hover:bg-white/10 hover:border-primary/40"
      aria-label={`Local time ${state.time} in ${state.city ?? state.timeZone}`}
    >
      {/* Hover shine sweep */}
      <span
        className="gakr-clock-shine pointer-events-none absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
        style={{ left: '-40%' }}
        aria-hidden="true"
      />
      <Clock size={14} className="text-primary shrink-0 relative" />
      <div className="relative flex items-baseline gap-1 font-mono text-xs md:text-sm text-white tabular-nums">
        <span>{hm.split(':')[0]}</span>
        <span className="gakr-clock-colon text-primary">:</span>
        <span>{hm.split(':')[1]}</span>
        <span className="gakr-clock-colon text-primary hidden sm:inline">:</span>
        <span className="gakr-clock-seconds hidden sm:inline text-muted-foreground">
          {seconds}
        </span>
        {meridiem && (
          <span className="text-[10px] md:text-xs text-muted-foreground ml-0.5">
            {meridiem}
          </span>
        )}
      </div>
      <span className="hidden md:flex items-center gap-1 pl-2 ml-1 border-l border-dark-border text-xs text-muted-foreground max-w-[110px] lg:max-w-[160px] truncate">
        <MapPin size={12} className="text-secondary shrink-0" />
        <span className="truncate">{state.city ?? cityFromTimeZone(state.timeZone)}</span>
      </span>
    </div>
  );
}
