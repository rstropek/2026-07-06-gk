import type { GeneratorConfig } from "ng-openapi";

const config: GeneratorConfig = {
  input: "../GkChat.Api/GkChat.Api.json",
  output: "./src/app/api-client",
  clientName: "GkChat",
  options: {
    dateType: "string",
    enumStyle: "union",
  },
};

export default config;
