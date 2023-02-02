import { config as dotenvConfig } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";

if (env === "development") {
  dotenvConfig({
    path: `${__dirname}/../.env.development`,
  });
} else {
  dotenvConfig();
}

const config = {
  PORT: process.env.PORT || 8001,
  middlewares: {
    allowedDomains: process.env.ALLOWED_DOMAINS || "http://localhost:3000,https://localhost:3001,http://localhost:3002",
    },
  NODE_ENV: env,
};

export default config;
