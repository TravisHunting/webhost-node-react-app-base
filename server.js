const express = require('express')
var Quote = require('inspirational-quotes');


const app = express()


app.get('/app-base', (req, res) => {
    res.sendFile('index.html', { root: '../public_html/app-base' });
});

app.get('/app-base/myapp/', (req, res) => res.send('Hello World!'))


app.get("/app-base/quote", function(req, res) {
  res.send(Quote.getQuote());
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../public_html/app-base' });
});

const server = app.listen(0, () => {
    console.log('Listening at http://localhost:', server.address().port);
});