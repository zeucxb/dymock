const { pipe } = require('ramda');

const LOCAL_DIR = process.cwd();

const getUrlConfig = () => {
  try {
    return require(`${LOCAL_DIR}/.url-config.json`);
  } catch (err) {
    return false;
  }
};

const getConfigPath = (url) => `${LOCAL_DIR}/${url}/config`;

const getConfigFileByPath = (filePath) => {
  try {
    return require(`${filePath}.js`);
  } catch (err) {
    try {
      return require(`${filePath}.json`);
    } catch (err) {
      return false;
    }
  }
}

const getConfigFileByUrl = pipe(getConfigPath, getConfigFileByPath);

module.exports = {
  getUrlConfig,
  getConfigPath,
  getConfigFileByPath,
  getConfigFileByUrl,
};