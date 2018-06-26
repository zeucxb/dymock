const run = require('../commands/run');

const commandControl = (program) => {
  run(program);
};

module.exports = {
  commandControl,
};