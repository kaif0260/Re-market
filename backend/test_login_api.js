import http from 'http';

const postData = JSON.stringify({
  email: 'admin@remarket.com',
  password: 'admin123'
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
    try {
      const json = JSON.parse(data);
      console.log('Login Status:', json.success ? '✅ SUCCESS' : '❌ FAILED');
      console.log('Message:', json.message);
      if (json.token) console.log('Token:', json.token.substring(0, 20) + '...');
      if (json.user) console.log('User Role:', json.user.role);
    } catch (e) {
      console.log('Response:', data.substring(0, 200));
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.write(postData);
req.end();
