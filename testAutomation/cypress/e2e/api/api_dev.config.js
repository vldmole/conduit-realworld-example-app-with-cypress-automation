const { defineConfig } = require("cypress");

module.exports = defineConfig({

  projectId: "h36t43", 
  
  env: {
    
  },
  
  e2e: {
    baseUrl: "http://localhost:3001",
    specPattern: "**/cypress/e2e/api/**/*.cy.js",
    fixturesFolder: "cypress/e2e/api", 
    supportFile: "testAutomation/cypress/support/e2e.js"
  }
});
