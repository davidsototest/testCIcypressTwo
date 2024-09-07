import { defineConfig } from "cypress";
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

export default defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com", 
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      // urlFront: "https://demoqa.com/",
      apiUrlBack: "http://localhost:3000",
      mobileViewportWidthBreakpoint: 414,
      coverage: false,
      // codeCoverage: {
      //   url: "http://localhost:3001/__coverage__",
      // },
      // allureReuseAfterSpec: true,
      allureResultsPath: 'allure-results',
    },
  },
});
