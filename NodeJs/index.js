const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Pool = require('pg').Pool;

app.use(cors());

//create a client instance of the pg library
var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "haufe_test",
  password: "Anaconda7",
  port: "5432"
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (request, response) => {
  console.log(request.body);
   
  let q = "SELECT id, \"user\" ->> 'role' as role FROM users WHERE \"user\" ->> 'username'  = '"+request.body.username+"' AND \"user\" ->> 'password'  = '"+request.body.password+"' ";
  
  pool.query(q, (error, results) => {
    if (error) 
    {
      throw error;
    } else 
    {
      if (results.rows.length)
        response.status(200).json({allowLogin: true, userID: results.rows[0].id, userRole: results.rows[0].role});
      else 
        response.status(200).json({allowLogin: false, userID: null, userRole: null});
    }
  });
});


app.get('/getUsers', (request, response) => {
   
  let q = "SELECT * FROM users WHERE \"user\" ->> 'role' = 'external' ";
  
  pool.query(q, (error, results) => {
    if (error) 
    {
      throw error;
    } else 
    {
      if (results.rows.length)
        response.status(200).json({users: results.rows});
        else response.status(200).json({users: []});
    }
  });
});

app.post('/register', (request, response) => {
  console.log(request.body);
   
   let q = "Insert Into users(\"user\") Values('{\"role\":\"internal\",\"password\":\""+request.body.password+"\",\"username\":\""+request.body.username+"\"}')";
   console.log(q); 
   pool.query(q, (error, results) => {
      if (error) {
        throw error;
      } else {
        if(results.rowCount == 1){
        let q = "SELECT id, \"user\" ->> 'role' as role FROM users WHERE \"user\" ->> 'username'  = '"+request.body.username+"' AND \"user\" ->> 'password'  = '"+request.body.password+"' ";
      
        pool.query(q, (error, results) => {
          if (error) {
            throw error;
          } else {
            if (results.rows.length)
              response.status(200).json({allowLogin: true, userID: results.rows[0].id, userRole: results.rows[0].role});
            else 
              response.status(200).json({allowLogin: false, userID: null, userRole: null});
          }
        });
        }
      }
    });
});

app.post('/create', (request, response) => {
  console.log(request.body);
   
   let q = "Insert Into users(\"user\") Values('{\"role\":\"external\",\"password\":\""+request.body.password+"\",\"username\":\""+request.body.username+"\"}')";
   console.log(q); 
   pool.query(q, (error, results) => {
      if (error) {
        throw error;
      } else {
        if(results.rowCount == 1){
        let q = "SELECT id, \"user\" ->> 'role' as role FROM users WHERE \"user\" ->> 'username'  = '"+request.body.username+"' AND \"user\" ->> 'password'  = '"+request.body.password+"' ";
      
        pool.query(q, (error, results) => {
          if (error) {
            throw error;
          } else {
            if (results.rows.length)
              response.status(200).json({allowLogin: true, userID: results.rows[0].id, userRole: results.rows[0].role});
            else 
              response.status(200).json({allowLogin: false, userID: null, userRole: null});
          }
        });
        }
      }
    });
});




app.post('/deleteUser', (request, response) => {
  console.log(request.body);
   
    let q = "delete from users where id = " + request.body.ID;
    console.log(q); 
    pool.query(q, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({deleted: true});
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});