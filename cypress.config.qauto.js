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
        reportDir: 'cypress/reports/qauto',
        overwrite: false,
        html: false,
        json: true,
    },

    // User credentials for QAuto (requirement #3 — usernames/passwords stored in config)
    env: {
        userCreds: {
            username: 'aqa_hillel_qauto@gmail.com',
            password: 'Qwerty12345',
        },
    },

    e2e: {
        baseUrl: 'https://qauto.forstudy.space',
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