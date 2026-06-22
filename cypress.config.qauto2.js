const { defineConfig } = require('cypress');

module.exports = defineConfig({
    retries: {
        runMode: 1,
        openMode: 0,
    },
    video: true,
    viewportHeight: 720,
    viewportWidth: 1080,

    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/reports/qauto2',
        overwrite: false,
        html: false,
        json: true,
    },

    // QAuto2 user credentials (requirement #3 — store login credentials in the config)
    env: {
        userCreds: {
            username: 'aqa_hillel_qauto2@gmail.com',
            password: 'Qwerty12345',
        },
    },

    e2e: {
        baseUrl: 'https://qauto2.forstudy.space',
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