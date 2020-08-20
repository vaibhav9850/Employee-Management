var Sequelize = require('sequelize');
const db = require('../config/database')


const User = db.define('emp', {

  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
  },

  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  lastname: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },


  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  joiningdate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  salary: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  department: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  role: {
    type: Sequelize.STRING,
    defaultValue: null,
    validate: {
      notEmpty: true,
    },
  },

  lastworkingday: {
    type: Sequelize.DATEONLY,
    defaultValue:null ,
    validate: {
      notEmpty: true,
    },
  },
});



db.sync({
  
})
  .then(function (err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  })


module.exports = User;


