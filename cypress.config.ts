import { defineConfig } from "cypress";
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

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
    specPattern: "cypress/e2e/**/**/*.feature",
    // supportFile: false,
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    // video: false,
    // screenshotOnRunFailure: false,
    env: {
      apiUrlBack: "http://localhost:3000",
      // mobileViewportWidthBreakpoint: 414,
      // coverage: false,
      allureReuseAfterSpec: true,
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
