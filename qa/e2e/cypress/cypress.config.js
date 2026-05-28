const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'e2e/**/*.cy.js',
    supportFile: false,
    video: false,
  },
});
