const { find, prop, equals } = require('ramda');

const { getUrlConfig } = require('../getters/configs');

const URL_CONFIG = getUrlConfig();

const parseUrl = (url) => {
  if (URL_CONFIG) {
    const urlMatch = find((config) => equals(
      '/' + prop('url', config), url
    ), URL_CONFIG);

    if (!urlMatch) throw new Error('Invalid resquest url');

    return urlMatch.path;
  } else {
    return `url${url}`;
  }
}

module.exports = {
  parseUrl,
};