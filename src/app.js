const express = require('express');
const bodyParser = require('body-parser')

const { responseControl, parseUrl } = require('./core');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/favicon.ico', res => res.sendStatus(200));
app.get('/robots.txt', res => res.sendStatus(200));
app.all('*', (req, res) => {
  console.log(`Request came: ${req.url}`);
  responseControl(req.method, parseUrl(req.path), req.body, res);
});

module.exports = (program) => {
  const server = app.listen(program.port, () => {
    const port = server.address().port;
    const host = (server.address().address === '::')
      ? 'localhost'
      : server.address().address;

    console.log(`Dymock running at http://${host}:${port}`)
  });
};