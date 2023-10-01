import { config } from "dotenv";
config();

const env = {
    ESP_ORIGIN: process.env.ESP_ORIGIN,
    TZ: process.env.TZ,
    NODE_ENV: process.env.NODE_ENV,
};

export default env;
