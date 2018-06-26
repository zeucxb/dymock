const { find, prop, whereEq } = require('ramda');

const { getConfigFileByUrl } = require('../getters/configs');

const responseHandler = (url, params, res) => {
  const configFile = getConfigFileByUrl(url);

  const sendErr = err => {
    res.status(404).send(`'${url}' (Not Found!)`);
    console.warn("Response: 404 ${url}");

    if (err) console.error(err);
  }

  if (configFile) {
    try {
      let responseMatch = find((option) => whereEq(
        prop('params', option), params
      ), prop('options', configFile));

      if (!responseMatch) {
        responseMatch = configFile.default
      } else {
        responseMatch = responseMatch.response;
      }

      res.status(200).json(responseMatch);
      console.log(`Response: 200 ${url}`);
    } catch (err) {
      sendErr(err);
    }
  } else {
    sendErr();
  }
}

const responseControl = (method, url, params, res) => {
  switch (method) {
    case 'GET':
    case 'POST':
    case 'PUT':
    case 'PATH':
    case 'DELETE':
      responseHandler(url, params, res);
      break;
    default:
      throw new Error('Invalid request METHOD');
  }
}

module.exports = {
  responseHandler,
  responseControl,
};