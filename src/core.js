const R = require('ramda');
const localDir = process.cwd();

const checkUrlConfig = () => {
  try {
    return require(`${localDir}/url.config.json`);
  } catch (err) {
    return false;
  }
};

const urlConfig = (checkUrlConfig)();

const paramsResponse = (url, params, res) => {
  const strPath = `${url}/config.js`;
  const filePath = `${localDir}/${strPath}`;

  try {
    const configFile = require(filePath);

    let responseMatch = R.find((option) => R.whereEq(
      R.prop('params', option), params
    ), R.prop('options', configFile));

    if (!responseMatch) {
      responseMatch = configFile.default
    } else {
      responseMatch = responseMatch.response;
    }

    res.status(200).json(responseMatch);
    console.log(`Response: 200 ${filePath}`);
  } catch (err) {
    console.log(err);
    res.status(404).send(`File '${filePath}' Not Found!`);
    console.log("Response: 404 ${filePath}, err");
  }
}

const responseControl = (method, url, params, res) => {
  switch (method) {
    case 'GET':
    case 'POST':
    case 'PUT':
    case 'PATH':
    case 'DELETE':
      paramsResponse(url, params, res);
      break;
    default:
      throw new Error('Invalid request METHOD');
  }
}

const parseUrl = (url) => {
  if (urlConfig) {
    const urlMatch = R.find((config) => R.equals(
      '/' + R.prop('url', config), url
    ), urlConfig);

    if (!urlMatch) throw new Error('Invalid resquest url');

    return urlMatch.path;
  } else {
    return `url/${url}`;
  }
}

module.exports = {
  paramsResponse,
  parseUrl,
  responseControl,
};