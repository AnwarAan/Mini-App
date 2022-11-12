// const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}`;
import mongoose from "mongoose";
import config from "./config.js";
import mysql from "mysql2/promise.js";

const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}`;
export const mongoConnection = async () => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Success Connect MonogDB"))
    .catch((err) => console.log(`Error Connect DB: ${err}`));
};

export const mysqlConnection = async () => {
  const connection = await mysql
    .createConnection({
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      host: config.MYSQL_HOST,
      database: config.MYSQL_DATABASE,
    })
    .then(() => console.log("Success Connect MySQLDB"));
};
