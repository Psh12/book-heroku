const router = require('express').Router();
const pool = require('../db');


router.get('/:name', async (req, res)=>{
    const {name} = req.params.id;

});

module.exports = router;