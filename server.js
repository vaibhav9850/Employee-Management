const express =require("express");
const pg =require("pg");
const bodyParser =require("body-parser");
const morgan =require("morgan");
var cors = require('cors')
const db=require('./config/database')
const path=require('path')
const PORT=process.env.PORT ||800;

const app=express()


app.use(
  cors({
    origin: 'http://localhost:3000',
  
  })
);


app.use(express.static(path.join(__dirname, 'build')));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.use('/public', express.static('public'));
app.use('/users',require('./routes/users'))

//app.use('/users',require('./routes/backendusers'))
//app.use(express.static(path.join(__dirname, "frontend/build")));


if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

app.get('/*', (req, res) => {
  app.use(express.static(path.join(__dirname, "frontend/build")));
});

  db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });




  app.listen(PORT, () => {
    console.log('Server Listening on port 800');
  });