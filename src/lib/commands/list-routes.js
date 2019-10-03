const klawSync = require('klaw-sync');
const chalk = require('chalk');

const urlDir = `${process.cwd()}/url`;

const getUrlFilePaths = () => {
    const options = { nofile: true };
    const paths = klawSync(urlDir, options);
    return paths;
}
const removeLocalDir = (path = '', dir) => {
    return path && path.replace(dir, '');
}

const listRoutes = (program) => {
    if (program.list) {
        try {
            const paths = getUrlFilePaths().map((item) => removeLocalDir(item.path, urlDir));
            console.log('\n');
            console.log(chalk.green('Availble urls:\n'));
            paths.forEach((path, i)=>{
                console.log(chalk.yellow(`${i+1} | ${path}`));
            });
            console.log('\n\n');
        } catch(e){
            console.error('Url path does\'t exist', e);
        }
        process.exit(0);
    }
}

module.exports = {
    listRoutes,
    getUrlFilePaths
}