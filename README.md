# DEXPRESS API

This is a demonstration of how to group mssql database stuff into a model. 

models/
- db.js provides access to:  
    - mssql 
    - connectionPool 
- dbConfig.js() contains an enclosure of the Database connect info pulled from a .env file
- dexpress.js contains all the calls to a database called DEXPRESS
- utils.js: offers some tools to organize the output from the mssql.execute statements with multiple SELECT statements

