import http from 'http';

const loginBody = {
  email: 'admin@remarket.com',
  password: 'Admin@123'
};

async function run() {
  // Login first
  const loginRes = await new Promise(resolve => {
    const loginData = JSON.stringify(loginBody);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const json = JSON.parse(data);
        resolve(json.token);
      });
    });
    
    req.write(loginData);
    req.end();
  });

  // Update all upcoming products to use relative URLs
  const updateData = JSON.stringify({
    products: [
      {
        title: 'Exciting New Product Launch',
        description: 'Featuring our latest innovative technology - Coming soon!',
        mediaType: 'video',
        mediaUrl: '/api/uploads/1778242669795-test.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop',
        isActive: true,
        category: 'Electronics',
        price: '$399',
        launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  });

  return new Promise(resolve => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/upcoming-products/replace',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginRes}`,
        'Content-Length': updateData.length
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const json = JSON.parse(data);
        console.log('✅ FINAL SETUP COMPLETE');
        console.log('   Updated upcoming products with correct URLs');
        console.log('   - Count:', json.count);
        console.log('   - Using relative URLs for video serving');
        console.log('\n📱 Frontend: http://localhost:3001 (or http://[::1]:3001)');
        console.log('🔧 Backend: http://localhost:5000');
        console.log('👤 Admin: admin@remarket.com / Admin@123');
        resolve();
      });
    });

    req.write(updateData);
    req.end();
  });
}

run().catch(err => {
  console.error('❌ ERROR:', err.message);
  process.exit(1);
});
