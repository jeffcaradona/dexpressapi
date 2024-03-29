const debug = require("debug")("dexpressapi:server");
const dexpress = require("../models/db/dexpress");



exports.getKeysAndTally = (req, res) => {
  debug("IN apiController.js getKeysAndTally");
  const key = req.params.key ? req.params.key : req.query.key;
  const params = { ...req.query, ...req.params };
  // Create a promises Array
  let promises = [];
  // Push the first proise
  promises.push(dexpress.selectKeys(key));
  // Push the second proise
  promises.push(
    dexpress.execTally({ ZeroOrOne: params.ZeroOrOne, MaxN: params.MaxN })
  );

  
  let data = {};
  Promise.allSettled(promises)
    .then((outputs) => {
      outputs.forEach((output, index) => {        
        data[output.value.name] = output.value;      
      });
      res.json(data);
    })
    .catch((error) => {
      res.status(500);
      res.json({ message: error.message });
    });
};


exports.getThreeRecordSets = async  (req, res) => {
  try {
    const result = await dexpress.execThreeRecordSets();
    debug(result);
    res.json(result);
  } catch (e) {
    res.status(500);
    res.json({ message: e.message });
  }
};

exports.getKeys = async (req, res) => {
  debug("IN apiController.js getKeys");
  try {
    const key = req.params.key ? req.params.key : "";

    //Validate Inputs

    const result = await dexpress.selectKeys(key);
    debug(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json({ message: e.message });
  }
};

exports.getTally = async (req, res) => {
  debug("IN apiController.js getTally");
  try {
    const params = { ...req.query, ...req.params };
    //Validate Inputs
    
    const result = await dexpress.execTally(params);
    debug(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.json({ message: e.message });
  }
};
