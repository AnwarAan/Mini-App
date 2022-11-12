import "dotenv/config";

export default {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,

  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_HOST: process.env.MYSQL_HOST,

  PORT: process.env.PORT,
};
