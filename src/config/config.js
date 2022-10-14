import "dotenv/config";

export default {
  DB_USER: process.env.MONGO_USER,
  DB_PASSWORD: process.env.MONGO_PASSWORD,
  DB_HOST: process.env.MONGO_HOST,

  PORT: process.env.PORT,
};
