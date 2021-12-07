module.exports = {
  "type":"postgres",
  "url": process.env.DATABASE_URL,
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "outDir": "dist/*.js",
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
    "dist/models/*.js"
  ],
  "cli":{
    "migrationsDir":"./src/database/migrations"
  }
}