const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001; 
let cors = require("cors");
let bodyParser = require("body-parser");
const myRoute = require("./Route/myroutes");


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'hazirjanab' 
  });
//console.log(pool); // Should log the pool object


// const pool = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', 
//   password: '', 
//   database: 'hazirjanab' 
// });

// pool.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the hazirjanab.");
// });
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
app.use((req, res, next) => {
    req.pool = pool;
  next();
});
app.use("/hazirjanab", myRoute);
app.use((req, res, next) => {
    
    next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});