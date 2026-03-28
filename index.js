const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());

const SECRET_KEY = 'hello-world';

app.get('/', (req, res) => {
  const header = `{alg: 'HS256', typ: 'JWT'}`; // A
  const payload = `{username: 'xuanhung', email: 'hung@gmail.com', avatar: 'avatar.png'}`; // A

  const buffer = Buffer.from(header, 'utf8');
  const header_Base64EncodedString = buffer.toString('base64');

  const bufferPayload = Buffer.from(payload, 'utf8');
  const payload_Base64EncodedString = bufferPayload.toString('base64');
  // const secret = `helloworld`;
  // const header_md5 = crypto.createHash('md5').update(header).digest('hex');
  // const payload_md5 = crypto.createHash('md5').update(payload).digest('hex');
  const sign = header + payload + SECRET_KEY;
  const signature_Real = crypto.createHash('md5').update(sign).digest('hex');
  const jwt = `${header_Base64EncodedString}.${payload_Base64EncodedString}.${signature_Real}`;
  res.cookie('jwt', jwt);
  res.send(jwt);
});

app.get('/verify', (req, res)=>{
  const jwt = req.cookies.jwt;
  const arrayString = jwt.split('.');
  const headerDecoded = arrayString[0];
  const payloadDecoded = arrayString[1];
  const signature = arrayString[2];

  const buffer = Buffer.from(headerDecoded, 'base64');
  const originalHeader = buffer.toString('utf8');

  const bufferPayload = Buffer.from(payloadDecoded, 'base64');
  const originalPayload = bufferPayload.toString('utf8');

  // const mySign = originalHeader + originalPayload + SECRET_KEY;
  // const mySignHash = crypto.createHash('md5').update(mySign).digest('hex');
  // res.send(`theirSign: ${signature}<br>mySign: ${mySignHash},<br> result = ${signature === mySignHash}`);

  const fakeSign = originalHeader + originalPayload + SECRET_KEY + 'dif Secret';
  const fakeSignHash = crypto.createHash('md5').update(fakeSign).digest('hex');
  res.send(`theirSign: ${signature}<br>myFakeSign: ${fakeSignHash},<br> result = ${signature === fakeSignHash}`);
})

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});