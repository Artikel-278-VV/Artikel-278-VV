const fs = require('fs');
const path = require('path');

// Datei-Pfad zur README.md
const readmePath = path.join(__dirname, 'README.md');

// Umgebungsvariablen validieren
const githubUser = process.env.GITHUB_USER;
const githubOwner = process.env.GITHUB_OWNER;

if (!githubUser || !githubOwner) {
  console.error('Environment variables GITHUB_USER and GITHUB_OWNER are required.');
  process.exit(1); // Exit mit Fehler
}

console.log('Environment variables:');
console.log('GITHUB_USER:', githubUser);
console.log('GITHUB_OWNER:', githubOwner);

try {
  // Backup erstellen
  const backupPath = `${readmePath}.backup`;
  fs.copyFileSync(readmePath, backupPath);
  console.log(`Backup created at ${backupPath}`);

  // Lese die aktuelle README.md
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Platzhalter ersetzen
  readmeContent = readmeContent
    .replace(/{{GITHUB_USER}}/g, githubUser)
    .replace(/{{GITHUB_OWNER}}/g, githubOwner);

  // Schreibe die aktualisierte README.md zurück
  fs.writeFileSync(readmePath, readmeContent);

  console.log('Successfully updated README.md with GitHub user and owner information.');
} catch (err) {
  console.error('Error handling README.md file:', err.message);
  process.exit(1);
}