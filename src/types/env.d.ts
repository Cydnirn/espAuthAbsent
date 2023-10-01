import "node";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ESP_ORIGIN: string;
            NODE_ENV: "production" | "development";
            SERVER_PORT: 5128 | 5129;
        }
    }
}
