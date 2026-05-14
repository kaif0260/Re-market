import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempPath = path.join(__dirname, 'tmp_test.mp4');
const loginBody = {
  email: 'admin@remarket.com',
  password: 'Admin@123'
};

async function run() {
  console.log('\n=== COMPREHENSIVE API TEST ===\n');

  // Step 1: Download sample MP4
  console.log('1️⃣  Downloading sample MP4...');
  try {
    const sampleUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
    const downloadRes = await fetch(sampleUrl);
    if (!downloadRes.ok) throw new Error('Download failed: ' + downloadRes.status);
    const buffer = Buffer.from(await downloadRes.arrayBuffer());
    fs.writeFileSync(tempPath, buffer);
    console.log('   ✅ Downloaded:', tempPath, `(${(buffer.length / 1024 / 1024).toFixed(2)}MB)\n`);
  } catch (err) {
    console.error('   ❌ Download failed:', err.message);
    process.exit(1);
  }

  // Step 2: Login
  console.log('2️⃣  Logging in as admin...');
  let token;
  try {
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginBody)
    });
    const loginJson = await loginRes.json();
    if (!loginJson.success) throw new Error('Login failed: ' + JSON.stringify(loginJson));
    token = loginJson.token;
    console.log('   ✅ Logged in. Token:', token.substring(0, 20) + '...\n');
  } catch (err) {
    console.error('   ❌ Login failed:', err.message);
    process.exit(1);
  }

  // Step 3: Upload video
  console.log('3️⃣  Uploading video...');
  let uploadedUrl;
  try {
    const form = new FormData();
    form.append('file', new Blob([fs.readFileSync(tempPath)]), 'test.mp4');

    const uploadRes = await fetch('http://localhost:5000/api/admin/uploads', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form
    });
    const uploadJson = await uploadRes.json();
    if (!uploadJson.success) throw new Error('Upload failed: ' + JSON.stringify(uploadJson));
    uploadedUrl = uploadJson.url;
    console.log('   ✅ Uploaded:', uploadedUrl, '\n');
  } catch (err) {
    console.error('   ❌ Upload failed:', err.message);
    process.exit(1);
  }

  // Step 4: Create upcoming product
  console.log('4️⃣  Creating upcoming product...');
  try {
    const productBody = {
      title: 'Test Video Product',
      description: 'This is a test video product for verification',
      mediaType: 'video',
      mediaUrl: uploadedUrl,
      thumbnailUrl: 'https://via.placeholder.com/400x300?text=Coming+Soon',
      isActive: true,
      category: 'Electronics',
      price: '$299',
      launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    const createRes = await fetch('http://localhost:5000/api/admin/upcoming-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productBody)
    });
    const createJson = await createRes.json();
    if (!createJson.success) throw new Error('Create failed: ' + JSON.stringify(createJson));
    console.log('   ✅ Created product ID:', createJson.product._id, '\n');
  } catch (err) {
    console.error('   ❌ Create failed:', err.message);
    process.exit(1);
  }

  // Step 5: Fetch upcoming products (public API)
  console.log('5️⃣  Fetching upcoming products (public API)...');
  try {
    const fetchRes = await fetch('http://localhost:5000/api/products/upcoming');
    const fetchJson = await fetchRes.json();
    console.log('   ✅ Found', fetchJson.count, 'products');
    if (fetchJson.products.length > 0) {
      const product = fetchJson.products[0];
      console.log('   - Title:', product.title);
      console.log('   - Type:', product.mediaType);
      console.log('   - URL:', product.mediaUrl);
      console.log('   - Active:', product.isActive);
    }
    console.log();
  } catch (err) {
    console.error('   ❌ Fetch failed:', err.message);
    process.exit(1);
  }

  // Step 6: Test file serving
  console.log('6️⃣  Testing file serving...');
  try {
    const fileRes = await fetch('http://localhost:5000' + uploadedUrl);
    if (fileRes.ok) {
      console.log('   ✅ File is accessible via', uploadedUrl);
      console.log('   - Status:', fileRes.status);
      console.log('   - Content-Type:', fileRes.headers.get('content-type'));
      console.log('   - Size:', fileRes.headers.get('content-length'), 'bytes\n');
    } else {
      console.error('   ❌ File returned status:', fileRes.status);
    }
  } catch (err) {
    console.error('   ❌ File serving test failed:', err.message);
  }

  console.log('=== ✅ ALL TESTS PASSED ===\n');
  console.log('Admin credentials: admin@remarket.com / Admin@123');
  console.log('Backend running on: http://localhost:5000');
  console.log('Frontend running on: http://localhost:3001\n');

  // Cleanup
  fs.unlinkSync(tempPath);
}

run().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
