import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempPath = path.join(__dirname, '..', 'tmp_sample.mp4');

const loginBody = {
  email: 'admin@remarket.com',
  password: 'Admin@123'
};

async function run() {
  console.log('Downloading sample MP4...');
  const sampleUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const downloadRes = await fetch(sampleUrl);
  if (!downloadRes.ok) throw new Error('Download failed: ' + downloadRes.status);
  const buffer = Buffer.from(await downloadRes.arrayBuffer());
  fs.writeFileSync(tempPath, buffer);
  console.log('Sample downloaded to', tempPath);

  console.log('Logging in...');
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginBody)
  });
  const loginJson = await loginRes.json();
  if (!loginJson.success) throw new Error('Login failed: ' + JSON.stringify(loginJson));
  const token = loginJson.token;
  console.log('Got token');

  console.log('Uploading video...');
  const form = new FormData();
  const fileData = fs.readFileSync(tempPath);
  form.append('file', new Blob([fileData]), 'sample.mp4');

  const uploadRes = await fetch('http://localhost:5000/api/admin/uploads', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });
  const uploadJson = await uploadRes.json();
  console.log('Upload response:', JSON.stringify(uploadJson, null, 2));

  if (uploadJson.success) {
    console.log('Uploaded URL:', uploadJson.url);
  }
}

run().catch(err => {
  console.error('ERROR', err);
  process.exit(1);
});
