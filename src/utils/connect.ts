import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger";
import config from "../../config/config";
dotenv.config({ path: "../../config.env" });

async function connect() {
  const dbUrl = config.DATABASE;

  try {
    await mongoose.connect(dbUrl);
    logger.info("connection successful");
  } catch (error) {
    logger.error("could not connect to db ");
    process.exit(1);
  }
}
export default connect;
