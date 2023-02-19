import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../config.env") });
interface ENV {
  NODE_ENV: string | undefined;
  DATABASE: string | undefined;
  PORT: number | undefined;

  JWT_SECRET: string | undefined;
  JWT_EXPIRES_IN: string | undefined;
  JWT_COOKIE_EXPIRES_IN: string | undefined;
}
interface Config {
  NODE_ENV: string;
  DATABASE: string;
  PORT: number;

  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_COOKIE_EXPIRES_IN: string;
}
const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE: process.env.DATABASE,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  };
};
const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
export default sanitizedConfig;
