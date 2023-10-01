const router = require("express").Router();
const debug = require("debug")("dexpressapi:server");

const {connectionPool} = require('../models/db');


router.get('/', async (req,res,next)=>{
    debug('IN apiRoutesV0.js get("/") callback');
    console.info("query", req.query);
    
    const connection = await connectionPool;
    const result = await connection.request().query('SELECT 1 as N') 

    console.info("result", result);
    
    res.json({ query: req.query, result });
});

module.exports = router;