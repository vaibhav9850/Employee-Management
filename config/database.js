var Sequelize = require('sequelize');

module.exports = new Sequelize('employee', 'postgres', '8080', {
  dialect: "postgres",
  port: 5432,
});

