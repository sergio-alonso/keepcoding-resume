var jsonServer = require('json-mock');
var server = jsonServer.create(); // Express server
server.use(jsonServer.defaults); // Default middlewares (logger, public, cors)
server.use(jsonServer.router('resume.json')); // Express router
server.listen(3000);
