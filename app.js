import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import config from "./src/config/config.js";
import { mongoConnection } from "./src/config/db.js";
import accessLogStream from "./src/helpers/logger.js";
//router
import userMongoRouter from "./src/routes/mongo/user.js";
import userMysqlRouter from "./src/routes/mysql/user.js";

const app = express();
const PORT = config.PORT || 3000;

mongoConnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

//router
app.use("/v1/user", userMongoRouter);
app.use("/v2/user", userMysqlRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
