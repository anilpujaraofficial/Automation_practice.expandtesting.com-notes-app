import { defineConfig } from "cypress";
require("dotenv/config");
const fs = require("fs");
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        checkFileExists(filepath: string) {
          if (fs.existsSync(filepath)) {
            return true;
          } else {
            return false;
          }
        },
      });
      on("task", {
        removeDirectory(fileDir: string) {
          return new Promise((resolve, reject) => {
            fs.rmdir(fileDir, { recursive: true }, (err: boolean) => {
              if (err) {
                return reject(err);
              }
              resolve(null);
            });
          });
        },
      });
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
    testIsolation: false,
    experimentalStudio: true,
    viewportWidth: 1440,
    viewportHeight: 900,
    numTestsKeptInMemory: 0,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    //Report define
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/utils/reports/mocha",
      reportFilename: "[status]-[name]-report",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      timestamp: "yyyy-mm-dd_HH-MM-ss",
      inlineAssets: true,
      saveJson: true,
      quiet: true,
      video: true,
      videoLink: true,
      reportTitle: "Cypress Test Report",
      reportPageTitle: "Cypress Test Results",
    },
    //Env define
    env: {
      grepFilterSpecs: true,
      testEnv: "qa",
      qa: {
        base_url: process.env.BASE_URL,
        api_url: process.env.API_URL,
        username: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
     
    },
  },
});
