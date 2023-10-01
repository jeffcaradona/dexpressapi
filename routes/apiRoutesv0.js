const router = require("express").Router();
const debug = require("debug")("dexpressapi:server");

router.get('/', (req,res,next)=>{
    debug('IN apiRoutesV0.js get("/") callback');
    console.info("query", req.query);
    res.json({query: req.query});
});

module.exports = router;