const router = require("express").Router();

const apiRoutesv0 = require("./apiRoutesv0");

router.use("/v0", apiRoutesv0);
router.use("/", apiRoutesv0);

module.exports = router;
