/*const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
   
});
*/

const Sequelize = require('sequelize');
const sequelize = new Sequelize('dafiqcm6bsgnvp', 'pkuqubdquniyqv','2c4cb9184b8001757d715022186345782032bcc749398bc67e94bc11a158bb50', {
  host: 'ec2-54-158-122-162.compute-1.amazonaws.com',
  dialect:'postgres',
  operatorsAliases: false,
 
   
});

module.exports=sequelize;