const debug = require("debug")("dexpressapi:server");
const { connectionPool, mssql } = require("./db");


exports.execTally = async (params) => {
   debug('IN dexpress.execTally(params)');      
   
   try {
        const connection = await connectionPool;
        const result = await connection
            .request()
            .input("ZeroOrOne", mssql.TinyInt, params.ZeroOrOne)
            .input("MaxN", mssql.BigInt, params.MaxN)
            .execute("dbo.spTally");        
        debug(result);
        return result;
   } catch (error) {
        debug(error); 
        return error;
   }

}