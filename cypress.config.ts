import { defineConfig } from "cypress";
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    setupNodeEvents,
    baseUrl: "https://demoqa.com",
    video: false,
    screenshotOnRunFailure: false,
    specPattern: "cypress/e2e/**/**/*.feature", 
    chromeWebSecurity: false,
    // setupNodeEvents(on, config) {
    //   allureWriter(on, config); // Configuración para Allure
    //   addCucumberPreprocessorPlugin(on, config); // Configuración para Cucumber
    //   return config;
    // },
    env: {
      apiUrlBack: "http://localhost:3000",
      mobileViewportWidthBreakpoint: 414,
      coverage: false,
      // codeCoverage: {
      //   url: "http://localhost:3001/__coverage__",
      // },
      // allureReuseAfterSpec: true,
      allureResultsPath: "allure-results",
    },
  },
});
