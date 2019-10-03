const express = require('express');
const bodyParser = require('body-parser')

const { parseUrl } = require('../parsers/url');
const { responseControl } = require('../resolvers/responses');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/favicon.ico', (_req, res) => res.sendStatus(200));
app.get('/robots.txt', (_req, res) => res.sendStatus(200));
app.all('*', (req, res) => responseControl(req.method, parseUrl(req.path), req.body, res));

module.exports = (program) => {
const server = app.listen(program.port, () => {
const port = server.address().port;
    const host = (server.address().address === '::')
        ? 'localhost'
        : server.address().address;

        console.log(`Dymock running at http://${host}:${port}`)
    });
}