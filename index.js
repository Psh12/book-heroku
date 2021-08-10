const express = require('express');
const cors = require('cors');
const register_login = require('./routes/jwtAuth');
const dashboard = require('./routes/dashboard');
const result = require('./routes/results');
const books = require('./routes/books');


const app = express();
app.use(express.json())
app.use(cors());

// Register and Login Routes
app.use('/auth',register_login);

// Dashboard Route
app.use('/dashboard',dashboard );

// Results Route
app.use('/results', result);

// Books Route
app.use('/books', books);

app.listen(5000, ()=>{
    console.log("Server started at Port 5000.....");
})