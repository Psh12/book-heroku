const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator'); 
const authorization = require('../Middleware/authorization');

router.post('/register', async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        const user = await pool.query("SELECT * from users where user_email = $1", [email]);
        if(user.rows.length != 0){
            return res.status(401).json("User already exists");
        }
       
        const salt =  await bcrypt.genSalt(10);
        const bcryptPassword =  await bcrypt.hash(password, salt);

         // Insert newUser to in the table
        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);
        
        
        // Creating Token for verification
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async (req, res)=>{
  
    try {
        const {email, password} =  req.body;
        // Check if the user exists
        const user = await pool.query("SELECT * from users where user_email = $1", [email]);
        if(user.rows.length === 0){
            return res.status(401).json('User Not Found');
        }

        // Check if the password is valid
        
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
          );
       

        if (!validPassword){
          return res.status(401).json("Email or Password Invalid");
        }

        // Give the JWT Token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

router.get('/verify',authorization,(req, res)=>{
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;