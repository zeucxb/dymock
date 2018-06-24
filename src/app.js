const express = require('express');
const bodyParser = require('body-parser')

const { responseControl, parseUrl } = require('./core');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/robots.txt', res => res.sendStatus(200));
app.all('*', (req, res) => {
  console.log(`Request came: ${req.url}`);
  responseControl(req.method, parseUrl(req.path), req.body, res);
});

module.exports = () => {
  const port = 3000;

  app.listen(port, () => console.log(`Dymock running at :${port}`));
};