const { defineConfig } = require("cypress");
require("dotenv").config();
module.exports = defineConfig({
  allowCypressEnv: true,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportFilename: "report",
    overwrite: true,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,

    env: {
      USERNAME: process.env.CYPRESS_USERNAME,
      PASSWORD: process.env.CYPRESS_PASSWORD,
      
      BRANCH_ADMIN_EMAIL: process.env.BRANCH_ADMIN_EMAIL,
      BRANCH_ADMIN_PASSWORD: process.env.BRANCH_ADMIN_PASSWORD
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
