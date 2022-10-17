import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import config from "./src/config/config.js";
import accessLogStream from "./src/helpers/logger.js";
//router
import userRoutes from "./src/routes/user.js";

const app = express();
const PORT = config.PORT || 3000;
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

//router
app.use("/v1/user", userRoutes);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
