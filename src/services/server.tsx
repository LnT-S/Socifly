//Contains logic, related to external API communications.

import config from "./config.json";

// const env:string = process.env['APP_ENV'] as string;
const env: string = "development";

interface CONFIG {
    server: string,
}
var envData: CONFIG;
if (env === "development")
    envData = config.development;
else if (env === "staging")
    envData = config.staging;
else if (env === "production")
    envData = config.production;
else
    envData = config.development;

export default envData;