import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    video: false,
    screenshotOnRunFailure: false
  },
  env: {
    // urlFront: "https://demoqa.com/",
    apiUrlBack: "http://localhost:3000",
    mobileViewportWidthBreakpoint: 414,
    coverage: false,
    // codeCoverage: {
    //   url: "http://localhost:3001/__coverage__",
    // },
  },
});
