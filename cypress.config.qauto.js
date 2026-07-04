const { defineConfig } = require('cypress');
const { baseConfig } = require('./config.base');

module.exports = defineConfig({
    ...baseConfig,
    reporterOptions: {
        ...baseConfig.reporterOptions,
        reportDir: 'cypress/reports/qauto',
    },
    // User credentials for QAuto (requirement #3 — usernames/passwords stored in config)
    env: {
        userCreds: {
            username: 'aqa_hillel_qauto@gmail.com',
            password: 'Qwerty12345',
        },
    },
    e2e: {
        ...baseConfig.e2e,
        baseUrl: 'https://qauto.forstudy.space',
    },
});