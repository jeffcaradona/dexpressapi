const router = require("express").Router();
const debug = require("debug")("dexpressapi:server");


const apiController = require('../controllers/apiController');

// http://localhost:8080/api/tally/ZeroOrOne/0/MaxN/100
router.get("/tally/ZeroOrOne/:ZeroOrOne/MaxN/:MaxN", apiController.getTally);
// http://localhost:8080/api/tally?ZeroOrOne=0&MaxN=5
router.get("/tally", apiController.getTally);
// http://localhost:8080/api/keys/EB6DA436-9086-4704-A5D2-8B934CC020BC
router.get("/keys/:key", apiController.getKeys);
// http://localhost:8080/api/keys
router.get("/keys", apiController.getKeys);




router.get('/', (req,res)=>{
    debug('IN apiRoutesV0.js get("/") callback');
    console.info("query", req.query);

    res.json({ query: req.query, endpoint: "\\api", returnValue:0 });

});

module.exports = router;