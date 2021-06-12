module.exports = {
  "type":"postgres",
  "url": process.env.DATABASE_URL,
  // "port":5432,
  // "host":"localhost",
  // "username":"postgres",
  // "password":"123456",
  // "database":"cuponsfood",
  "migrations":[
    "dist/database/migrations/*.ts"//"./src/database/migrations/*.ts"
  ],
  "entities":[
    "dist/models/*.ts" //"./src/models/*.ts"
  ],
  "cli":{
    "migrationsDir":"./src/database/migrations"
  }
}