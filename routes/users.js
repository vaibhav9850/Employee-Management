//const express =require("express");
const express = require("express");
var sequelize = require('sequelize')
const router = express.Router();
const bodyParser = require("body-parser");
const db = require('../config/database')
const User = require('../models/User')
//const Data = require('../Data.json');
//const { json } = require("body-parser");
var multer = require('multer')
const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//const { DATEONLY } = require("sequelize");
//const { Model } = require("sequelize");


const saltRounds = 10;

router.get("/", (req, res, next) => {
  res.send("hello")
}
)

 function validateUser() {
  return (req, res, next) => {
    console.log("executing")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, 'secretKey', (err) => {

      if (err) return res.sendStatus(403)

      next()
    })
  }
}

router.post("/linechartOfJoinedEmployee", (req, res) => {
   
  var dt1=req.body.startDate;
  var dt2=req.body.endDate;
  var dept=req.body.department;
  
 
  db.query("SELECT to_char(joiningdate,'Month') joined_month, Count(*) FROM emps WHERE department = :dept and joiningdate between date :dt1 AND date :dt2 GROUP BY to_char(joiningdate,'Month') ORDER BY 1",

{ replacements: { dept: dept, dt1:dt1,dt2},
type: sequelize.QueryTypes.SELECT})
  .then(result=>{
    res.send(result)
  }).catch(err =>console.log(err))

})


router.post("/linechartOfLeavedEmployee", (req, res) => {
  
  var dt1=req.body.startDate;
  var dt2=req.body.endDate;
  var dept=req.body.department;
  
 
  db.query("SELECT to_char(lastworkingday,'Month') leaved_month, Count(*) FROM emps WHERE department = :dept and lastworkingday between date :dt1 AND date :dt2 GROUP BY to_char(lastworkingday,'Month') ORDER BY 1",

{ replacements: { dept: dept, dt1:dt1,dt2},
type: sequelize.QueryTypes.SELECT})
  .then(result=>{
    console.log(result)
    res.send(result)
  }).catch(err =>console.log(err))

})

router.get("/piechart", (req, res) => {

  User.findAll({
    attributes: [
      'department',
      [sequelize.fn('count', '*'), 'count']
    ],
    group: 'department'
  }).then(result => {
    res.send(result);
  }).catch(err =>console.log(err))

})



router.post("/show",validateUser(), function (req, res) {
  console.log("inside show")
  const limit = 5;
  const page = req.body.page;
  const value = (page - 1) * limit

  User.findAll({
    order: [
      ['id', 'ASC'],

    ],
    attributes: ['id', 'firstname', 'lastname', 'email', 'password', 'joiningdate', 'gender', 'role'],
    where:{
        lastworkingday:null
    },
    offset: value,
    limit: limit
  }).then((result) => {
    res.send(result)
    //res.send(JSON.stringify(result))
  }).catch(err =>console.log(err))

}
);


router.post("/searchRecord", (req, res) => {
  const firstName = req.body.search;

  console.log(firstName)

  User.findAll({
    where: { firstname: firstName }
  }).then((result) => {
    res.send(result)
  }).catch(err =>console.log(err))
})


router.put('/update', (req, res) => {

  var id = req.body.id;
  var role = req.body.role;
  User.update(
    { role: role },
    { where: { id: id } }
  )
    .then(() => res.send("updated successfully")
    ).catch(err =>console.log(err))
})



router.post('/create', function (req, res) {

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    User.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: hash,
      joiningdate: req.body.joiningDate,
      salary: req.body.salary,
      department: req.body.department,
      gender: req.body.gender,
      role:"Normal Admin"
    }).then(() => {
      var msg = "user added successfully";
      res.json({ message: msg })
    }).catch(err => console.log(err));
  })
})

const DIR = './public/';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage })

router.post('/addBulk', upload.single('file'), function (req, res, next) {
  const user = './public/' + req.file.filename;
  //console.log("executing")
  let rawdata = fs.readFileSync(user);
  //res.send(JSON.stringify(User))
  let users = JSON.parse(rawdata);
  User.bulkCreate(users)
    .then(() => {
      console.log("data inserted")
      res.send("SUCCESS")
    }).catch(err => console.log(err))



})

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }

  }).then(function (user) {

    if (user) {
      console.log("user found")
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          const accessToken = jwt.sign(user.email, 'secretKey');
          console.log("access token" + accessToken)

          const role = user.role;
          console.log(role)
          if (role == 'admin') {

            var data = [{
              message: "ADMIN",
              accessToken: accessToken
            }]
            console.log("data sent")
            res.json({ data: data })
          }

          else if (role == 'Normal Admin') {

            var data = [{
              message: "Normal Admin",
              accessToken: accessToken
            }]
            console.log("data sent")
            res.json({ data: data })
          }

          else {

            var data = [{
              message: "Not an Admin",
              //accessToken:null
            }]
            console.log("data sent")
            res.json({ data: data })
          }
        }

        else {

          var data = [{
            message: "Invalid Password",
            //accessToken:null
          }]
          console.log("data sent")
          res.json({ data: data })
        }
      })
    }
    else {
      var data = [{
        message: "Invalid Email"
      }]
      console.log("data sent")
      res.json({ data: data })
    }
  }).catch(err =>console.log(err))
});



module.exports = router;