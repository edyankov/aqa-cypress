const { defineConfig } = require('cypress');

module.exports = defineConfig({
    allowCypressEnv: false,
    retries: {
        runMode: 1,
        openMode: 0,
    },
    video: true,
    viewportHeight: 720,
    viewportWidth: 1080,
    e2e: {
        baseUrl: 'https://example.cypress.io',
        specPattern: 'cypress/e2e/**/*.test.js',
        setupNodeEvents(on, config) {
            on('task', {
                log(message) {
                    console.log(message);
                    return null;
                },
            });
        },
    },
});
