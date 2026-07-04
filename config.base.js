// Shared Cypress configuration for all environments.
// Specific configs (cypress.config.js, *.qauto.js, *.qauto2.js) import this
// and extend it only with what differs (baseUrl, credentials, report dir).

const baseConfig = {
    retries: {
        runMode: 1,
        openMode: 0,
    },
    video: true,
    viewportHeight: 720,
    viewportWidth: 1080,

    // mochawesome reporter (task requirement — configured in the main config)
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: false,
        json: true,
    },

    e2e: {
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
};

module.exports = { baseConfig };