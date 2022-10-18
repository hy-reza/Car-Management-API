require(dotenv).config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT } = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
