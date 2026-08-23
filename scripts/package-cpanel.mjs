/**
 * Builds a cPanel-ready deployment folder.
 *
 * Next's `output: 'standalone'` emits a self-contained server plus only the
 * node_modules it actually reaches at runtime — but it deliberately leaves out
 * two things you have to copy yourself: the static chunks and /public. This
 * script runs the build with CPANEL_BUILD=true, assembles all three parts into
 * deploy/cpanel/, and drops in the .htaccess and env template the server needs.
 *
 *   npm run build:cpanel
 *
 * The result is a folder you upload as-is. Nothing is installed on the server.
 */

import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'deploy', 'cpanel');

const step = (msg) => console.log(`\n[36m▸ ${msg}[0m`);

// ---------------------------------------------------------------- build
step('Building (CPANEL_BUILD=true)');
rmSync(join(ROOT, '.next'), { recursive: true, force: true });
execSync('npx next build', {
  stdio: 'inherit',
  env: { ...process.env, CPANEL_BUILD: 'true' },
});

const standalone = join(ROOT, '.next', 'standalone');
if (!existsSync(standalone)) {
  console.error('\n✗ .next/standalone was not produced — is output: "standalone" still set in next.config.ts?');
  process.exit(1);
}

// ---------------------------------------------------------------- assemble
step('Assembling deploy/cpanel');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// 1. the standalone server + its trimmed node_modules
cpSync(standalone, OUT, { recursive: true });

// 2. static chunks — standalone omits these on purpose
cpSync(join(ROOT, '.next', 'static'), join(OUT, '.next', 'static'), { recursive: true });

// 3. everything under /public (images, fonts, robots.txt)
cpSync(join(ROOT, 'public'), join(OUT, 'public'), { recursive: true });

// ---------------------------------------------------------------- server files
step('Writing server files');

// Passenger serves the domain from public_html; this hands every request to the
// Node app instead of looking for files on disk. Only needed if the app root is
// not itself the document root.
writeFileSync(
  join(OUT, '.htaccess'),
  `# Passenger runs the Node app; this stops Apache trying to serve files itself.
PassengerAppRoot "REPLACE_WITH_ABSOLUTE_APP_ROOT"
PassengerBaseURI "/"
PassengerNodejs "REPLACE_WITH_NODE_BINARY_PATH"
PassengerAppType node
PassengerStartupFile server.js

# cPanel's Node.js Selector normally writes these three lines for you when you
# create the app. If it did, you can delete this file entirely.
`
);

// A template so the required build-time vars are obvious on the server side.
const envExample = existsSync(join(ROOT, '.env.local'))
  ? readFileSync(join(ROOT, '.env.local'), 'utf8').replace(/^(?!#|\s*$)([A-Z_]+)=.*$/gm, '$1=')
  : '';
writeFileSync(
  join(OUT, '.env.production.template'),
  `# Copy to .env.production on the server, or set these in cPanel's Node.js app
# environment-variables panel.
#
# NOTE: every NEXT_PUBLIC_* value is baked into the JavaScript at BUILD time.
# Changing one here does nothing — you must rebuild and re-upload.
${envExample}`
);

// ---------------------------------------------------------------- report
const du = (dir) => {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    total += entry.isDirectory() ? du(p) : statSync(p).size;
  }
  return total;
};
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);

step('Done');
console.log(`  deploy/cpanel        ${mb(du(OUT))} MB total`);
console.log(`    ├─ server.js       Passenger startup file`);
console.log(`    ├─ node_modules    ${mb(du(join(OUT, 'node_modules')))} MB (runtime only)`);
console.log(`    ├─ .next           ${mb(du(join(OUT, '.next')))} MB`);
console.log(`    └─ public          ${mb(du(join(OUT, 'public')))} MB`);
console.log(`\n  Upload the CONTENTS of deploy/cpanel to your cPanel app root.`);
console.log(`  See docs/deploy-cpanel.md for the click-by-click steps.\n`);
