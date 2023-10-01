const router = require("express").Router();
const debug = require("debug")("dexpressapi:server");


const apiController = require('../controllers/apiController');
// http://localhost:8080/api/tally?ZeroOrOne=0&MaxN=5
router.get("/tally", apiController.getTally);


const { connectionPool } = require("../models/db");
router.get('/', async (req,res)=>{
    debug('IN apiRoutesV0.js get("/") callback');
    console.info("query", req.query);
    try {
        const connection = await connectionPool;
        const result = await connection
          .request()
          .query("SELECT char(92)+'api' as [endpoint]"); 
        console.info("result", result);    
        res.json({ query: req.query, result });
    } catch (e) {
        res.status(500);
        res.json({message:e.message});
    }
});

module.exports = router;