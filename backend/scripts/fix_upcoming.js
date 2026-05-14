import http from 'http';

const postData = JSON.stringify({
  email: 'admin@remarket.com',
  password: 'Admin@123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const loginJson = JSON.parse(data);
    const token = loginJson.token;

    // Replace all upcoming products with fresh ones
    const replaceData = JSON.stringify({
      products: [
        {
          title: 'New Product Coming Soon',
          description: 'Exciting product launching soon with video preview',
          mediaType: 'video',
          mediaUrl: '/api/uploads/1778242669795-test.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop',
          category: 'Electronics',
          price: '$299',
          isActive: true,
          launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    });

    const replaceOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/upcoming-products/replace',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Length': replaceData.length
      }
    };

    const replaceReq = http.request(replaceOptions, (res) => {
      let replaceRes = '';
      res.on('data', (chunk) => {
        replaceRes += chunk;
      });
      res.on('end', () => {
        const json = JSON.parse(replaceRes);
        console.log('✅ Updated upcoming products:');
        console.log('   - Count:', json.count);
        console.log('   - Products cleaned and reset');
      });
    });

    replaceReq.write(replaceData);
    replaceReq.end();
  });
});

req.write(postData);
req.end();
