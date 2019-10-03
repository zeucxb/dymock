const chalk = require('chalk');

const { getUrlConfig } = require('../getters/configs');
const { getUrlFilePaths, getUrlsFromJson } = require('../getters/urls');

const LOCAL_URL_DIR = `${process.cwd()}/url`;

const removeLocalDir = (path = '', dir) => {
    return path && path.replace(dir, '');
}

const createLogMessage = (urls) => {
    console.log('\n');
    console.log(chalk.green('Availble urls:\n'));
    urls.forEach((path, i) => {
        console.log(chalk.yellow(`${i + 1} | ${path}`));
    });
    console.log('\n\n');
}

const listRoutes = (program) => {
    if (program.list) {
        const urlConfig = getUrlConfig();
        if(urlConfig) {
            const urls = getUrlsFromJson(urlConfig);
            createLogMessage(urls);
            process.exit(0);
        }
        try {
            const paths = getUrlFilePaths().map((item) => removeLocalDir(item.path, LOCAL_URL_DIR));
            createLogMessage(paths);

        } catch (e) {
            console.error('Url path does\'t exist', e);
        }

        process.exit(0);
    }
}

module.exports = {
    listRoutes,
    getUrlFilePaths
}