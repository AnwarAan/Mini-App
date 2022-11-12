import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import config from "./src/config/config.js";
import { mongoConnection, mysqlConnection } from "./src/config/db.js";
import accessLogStream from "./src/helpers/logger.js";
//router
import userRoutes from "./src/routes/user.js";

const app = express();
const PORT = config.PORT || 3000;

mongoConnection();
mysqlConnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

//router
app.use("/v1/user", userRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
