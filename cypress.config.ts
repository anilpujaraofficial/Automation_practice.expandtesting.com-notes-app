import { defineConfig } from "cypress";
require("dotenv/config");
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    experimentalStudio: true,
    viewportWidth: 1440,
    viewportHeight: 900,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    //Report define
    reporter: "mochawesom",
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
        api_url: null,
        username: null,
        password: null,
      },
      dev: {
        base_url: process.env.BASE_URL,
        api_url: null,
        username: null,
        password: null,
      },
    },
  },
});
