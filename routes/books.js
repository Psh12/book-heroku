const router = require('express').Router();
const pool = require('../db');


router.get('/', async(req, res)=>{
    try {
        const response = await pool.query('select books.book_number, books.title, books.synopsis, books.link, books.demographic, books.genre, n2.author_name from books INNER JOIN (select book_authors.book_number, authors.author_name from book_authors INNER JOIN authors on book_authors.author_id = authors.author_id) n2 on books.book_number = n2.book_number');
        res.json(response.rows);
    } catch (error) {
        console.error(error.message);
    }
})



module.exports = router;