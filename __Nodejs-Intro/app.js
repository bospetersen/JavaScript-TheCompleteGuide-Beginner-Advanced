const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next)=> {
  res.setHeader('Content-Type', 'text/html');
  next();
})

app.use((req, res, next)=> {
  res.send('<h1>Hello world</h1>');
  // next(); 
})

// app.get()

if (app.listen(3000)) {
  console.log('server is running and listning on port 3000')
}