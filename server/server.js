const express = require('express');
const cors=require('cors');
const body_parser = require('body-parser');
const app = express();
//clearing the console
console.clear();


//for using cross origin requests and disabling cors policy reinforcement
app.use(cors());


// importing the pool from database.js
const { pool } = require('./database');

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// parse application/json
app.use(body_parser.json())


//starting the app
app.listen(3000, (err, res) => {
  if (err) {
    console.log(`cannot start server  at port 3000 ${err}`);
  }
  else {
    console.log("server started at port 3000 ");
  }
});

// connecting database
pool.connect((err, res) => {
  if (err) {
    console.log(`error happened in connection ${err}`);
  }
  else {
    console.log('database connection successful');
  }
})

//get all data 
async function get_all_data(){
  try{
    const query='SELECT * FROM full_stack_web_app';
    const response=await pool.query(query);
    return response.rows;
  }catch(err){
    return err;
  }
}

//get data with primary key
async function get_data(roll) {
  try {
    const query = 'SELECT * FROM full_stack_web_app WHERE user_id=$1';
    const response = await pool.query(query, [roll]);
    return response;
  } catch (err) {
    return err;
  }
}

//post data query
async function insert_data(roll, name) {
  try {
    const query = 'INSERT INTO full_stack_web_app VALUES ($1,$2)';
    const response = await pool.query(query, [roll, name]);
  } catch (err) {
    return err;
  }
}

// deleting a single row
async function delete_data(roll){
  try{
    const query='DELETE FROM full_stack_web_app WHERE user_id= $1';
    const response=await pool.query(query,[roll]);
    return response;
  }catch(err){
    return err
  }
}


//getting the post query for database insertion
app.post('/post', (req, res) => {
  //loggin the data recieved
  console.log(req.body);

  //checking if the data exists or not
  get_data(req.body.roll).then((data) => {
    if (data.rowCount != 0) {
      res.status(300).send('record with roll already exists');
    }
    else {
      //inserting the data
      insert_data(req.body.roll, req.body.name).then((data) => {
        console.log(data);
        res.status(200).send("success");
      }).catch((error) => {
        console.log(error)
        res.status(400).send(error);
      })
    }

  }).catch((error) => {
    console.log(error);
  })
});

app.get('/home',(req,res)=>{
  get_all_data().then((data)=> {
    res.status(200).send(data);
  }).catch((error)=>{
    res.status(400).send(error);
  })
})

app.delete('/delete',(req,res)=>{
  delete_data(req.body.roll).then((data)=>{
    res.status(200).send(`successfully removed record with user_id ${req.body.roll}`);
  }).catch((error)=>{
    res.status(400).send(error);
  })
})