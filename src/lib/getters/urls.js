const klawSync = require('klaw-sync');
const R = require('ramda');

const getUrlFilePaths = () => {
    const options = { nofile: true };
    const LOCAL_URL_DIR = `${process.cwd()}/url`;
    const paths = klawSync(LOCAL_URL_DIR, options);
    return paths;
}

const getUrlsFromJson = (data) => {
    const predicate = (val, key) => key ===  'url';
    const urls = data.map((obj)=>{return R.pickBy(predicate, obj)});
    return R.map((obj) => obj.url, urls);
}

module.exports = {
    getUrlFilePaths, 
    getUrlsFromJson
}