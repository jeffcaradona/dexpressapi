const debug = require("debug")("dexpressapi:server");
const dexpress = require("../models/dexpress");


exports.getTally = async (req,res)=>{
    debug("IN apiController.js getTally");
    try{
        const result = await dexpress.execTally(req.query);
        debug(result);
        res.json(result);
    } catch(error) {
        res.status(500);
        res.json({ message: e.message });  
    }
}