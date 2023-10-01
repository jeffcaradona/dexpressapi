const debug = require("debug")("dexpressapi:server");
const dexpress = require("../models/db/dexpress");


exports.getTally = async (req,res)=>{
    debug("IN apiController.js getTally");
    try{

        const params = { ...req.query, ...req.params };
        //Validate Inputs 
        
        const result = await dexpress.execTally(params);
        debug(result);
        res.json(result);
    } catch(error) {
        res.status(500);
        res.json({ message: e.message });  
    }
}