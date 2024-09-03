import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiUrl: "https://demoqa.com/",
    mobileViewportWidthBreakpoint: 414,
    coverage: false,
    // codeCoverage: {
    //   url: "http://localhost:3001/__coverage__",
    // },
  },
});
