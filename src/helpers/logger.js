import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const accessLogStream = fs.createWriteStream(path.join(__dirname, "../access.log"), {
  flags: "a",
});

export default accessLogStream;
