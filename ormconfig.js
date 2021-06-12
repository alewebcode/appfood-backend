console.log('process.env.DATABASE_URL :>>',process.env.DATABASE_URL);
module.exports = {
  "type":"postgres",
  "url": process.env.DATABASE_URL,
  "ssl": true,
  // "port":5432,
  // "host":"localhost",
  // "username":"postgres",
  // "password":"123456",
  // "database":"cuponsfood",
  "migrations":[
    "dist/database/migrations/*.js"//"./src/database/migrations/*.ts"
  ],
  "entities":[
    "dist/models/*.js" //"./src/models/*.ts"
  ],
  "cli":{
    "migrationsDir":"./src/database/migrations"
  }
}