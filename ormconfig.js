module.exports = {
  "type":"postgres",
  "url": process.env.DATABASE_URL,
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "port":5432,
  "host":"localhost",
  "username":"postgres",
  "password":"123456",
  "database":"cuponsfood",
  "migrations":[
    "dist/database/migrations/*.js"
    
    //"./src/database/migrations/*.ts"
  ],
  "entities":[
    "dist/models/*.js",
    "dist/services/*.js",
    "dist/utils/*.js"
    
    //"./src/models/*.ts",
  ],
  "cli":{
    "migrationsDir":"./src/database/migrations"
  },
  
}