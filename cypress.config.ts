import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    setupNodeEvents(on, config) { //evita los logs de todos los sericios llamados
      on('after:run', (results) => {
        console.log('Cypress Run Results:', results);
      });
    },
    video: false,
    screenshotOnRunFailure: false
  },
  env: {
    CYPRESS_NO_COMMAND_LOG: 1,
    // urlFront: "https://demoqa.com/",
    apiUrlBack: "http://localhost:3000",
    mobileViewportWidthBreakpoint: 414,
    coverage: false,
    // codeCoverage: {
    //   url: "http://localhost:3001/__coverage__",
    // },
  },
});
