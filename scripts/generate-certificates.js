import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

const PRIOR_DIR = resolve('public/certificates/prior');
const REGULAR_DIR = resolve('public/certificates');
const OUTPUT_FILE = resolve('src/data/certificates.json');

function slugify(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function parseCertificate(filename, priority = false) {
  const name = slugify(filename);
  let issuer = 'Unknown';
  let date = '';

  if (name.includes('Infosys')) {
    issuer = 'Infosys Springboard';
  } else if (name.includes('Devit')) {
    issuer = 'Devit';
    date = 'May – Jun 2026';
  } else if (name.includes('Internpe')) {
    issuer = 'InternPe';
    date = 'May – Jun 2026';
  } else if (name.includes('Quantum')) {
    issuer = 'Amaravati Quantum Valley · Qubitech · WISER';
    date = '2025 – 2026';
  } else if (name.includes('Nptel')) {
    issuer = 'IIT Madras · Skill India';
    date = 'Jul – Oct 2025';
  } else if (name.includes('Kaggle')) {
    issuer = 'Kaggle';
    if (name.includes('Intro To Ml')) date = 'Mar 2026';
    else if (name.includes('Intro To Ai Ethics')) date = 'Mar 2026';
    else if (name.includes('Python Coder Badge')) date = '2024';
  } else if (name.includes('Spoken Tutorial')) {
    issuer = 'Spoken Tutorial · IIT Bombay';
    if (name.includes('Java')) date = 'Nov 2024';
    else if (name.includes('Python')) date = 'Mar 2025';
  } else if (name.includes('Outsyslayer')) {
    issuer = 'ByondCampuz · GPREC';
    date = '2026';
  }

  return {
    title: name,
    issuer,
    date,
    image: `/certificates/${filename}`,
    priority,
  };
}

async function generateCertificates() {
  try {
    await fs.mkdir(PRIOR_DIR, { recursive: true });

    const [priorFiles, regularFiles] = await Promise.all([
      fs.readdir(PRIOR_DIR).catch(() => []),
      fs.readdir(REGULAR_DIR).catch(() => []),
    ]);

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

    const priorCerts = priorFiles
      .filter(f => imageExtensions.some(ext => f.toLowerCase().endsWith(ext)))
      .map(f => parseCertificate(f, true));

    const regularCerts = regularFiles
      .filter(f => imageExtensions.some(ext => f.toLowerCase().endsWith(ext)))
      .filter(f => !priorFiles.includes(f))
      .map(f => parseCertificate(f, false));

    const allCerts = [...priorCerts, ...regularCerts];

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(allCerts, null, 2));
    console.log(`Generated ${allCerts.length} certificates (${priorCerts.length} priority, ${regularCerts.length} regular)`);
  } catch (err) {
    console.error('Failed to generate certificates:', err);
    process.exit(1);
  }
}

generateCertificates();