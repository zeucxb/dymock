const server = require('../server/server');
const { listRoutes } = require('../commands/list-routes');
module.exports = (program) => {
  listRoutes(program);
  server(program);
};