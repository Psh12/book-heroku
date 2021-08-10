const router = require('express').Router();
const pool = require('../db');
const authorization = require('../Middleware/authorization');

router.post("/", authorization, async (req, res)=>{
    try {
        const {book_number} = req.body;
        const resultValue = await pool.query('insert into user_book(user_id, book_number) VALUES ($1, $2)', [req.user,book_number]);
        res.json("Successfully Added");
    } catch (error) {
        console.error(error.message);
        res.status(500).json("This book is already saved in the Dashboard");
    }
})

module.exports = router;