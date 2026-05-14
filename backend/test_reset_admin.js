import http from 'http';

const postData = JSON.stringify({
  email: 'admin@remarket.com',
  password: 'Admin@123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/debug/reset-admin',
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
    console.log('Reset response:', data);
    
    // Now try to login
    setTimeout(() => {
      const loginData = JSON.stringify({
        email: 'admin@remarket.com',
        password: 'Admin@123'
      });

      const loginOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': loginData.length
        }
      };

      const loginReq = http.request(loginOptions, (res) => {
        let loginResponse = '';
        res.on('data', (chunk) => {
          loginResponse += chunk;
        });
        res.on('end', () => {
          try {
            const json = JSON.parse(loginResponse);
            console.log('\n✅ Login Successful!');
            console.log('User Role:', json.user.role);
            console.log('Token (first 30 chars):', json.token.substring(0, 30) + '...');
          } catch (e) {
            console.log('Login error:', loginResponse.substring(0, 200));
          }
        });
      });

      loginReq.write(loginData);
      loginReq.end();
    }, 1000);
  });
});

req.write(postData);
req.end();
