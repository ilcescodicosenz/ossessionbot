import { spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Levelup image generator
 * @param {String} teks
 * @param {Number} level
 * @return {Promise<Buffer>}
 */
export function levelup(teks, level) {
  return new Promise((resolve, reject) => {
    if (!global.support.gm && !global.support.magick) {
      return reject(new Error('Neither GraphicsMagick nor ImageMagick is supported!'));
    }

    const fontDir = join(__dirname, '../src/font');
    const fontLevel = join(fontDir, 'level_c.otf');
    const fontTexts = join(fontDir, 'texts.otf');
    const templatePath = join(__dirname, '../src/lvlup_template.jpg');

    let annotationPosition = '+1385+260';
    if (level > 2) annotationPosition = '+1370+260';
    if (level > 10) annotationPosition = '+1330+260';
    if (level > 50) annotationPosition = '+1310+260';
    if (level > 100) annotationPosition = '+1260+260';

    const command = global.support.gm ? 'gm' : 'magick';
    const args = [
      'convert',
      templatePath,
      '-font', fontTexts,
      '-fill', '#0F3E6A',
      '-size', '1024x784',
      '-pointsize', '68',
      '-interline-spacing', '-7.5',
      '-annotate', '+153+200', teks,
      '-font', fontLevel,
      '-fill', '#0A2A48',
      '-size', '1024x784',
      '-pointsize', '140',
      '-interline-spacing', '-1.2',
      '-annotate', annotationPosition, String(level),
      '-append',
      'jpg:-'
    ];

    console.log(`Running: ${command} ${args.join(' ')}`);

    const bufs = [];
    const process = spawn(command, args);

    process.stdout.on('data', (chunk) => bufs.push(chunk));
    process.stderr.on('data', (err) => console.error('Error:', err.toString()));

    process.on('error', reject);
    process.on('close', (code) => {
      if (code !== 0) return reject(new Error(`Process exited with code ${code}`));
      resolve(Buffer.concat(bufs));
    });
  });
}
