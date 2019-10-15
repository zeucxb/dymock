const server = require('../server/server');
const { listRoutes } = require('../commands/list-routes');
module.exports = (program) => {
  switch (true) {
    case program.list:
      listRoutes();
      break;
    default:
      server(program);
      break;
  }

};