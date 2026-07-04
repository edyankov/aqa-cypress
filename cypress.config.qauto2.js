const { defineConfig } = require('cypress');
const { baseConfig } = require('./config.base');

module.exports = defineConfig({
    ...baseConfig,
    reporterOptions: {
        ...baseConfig.reporterOptions,
        reportDir: 'cypress/reports/qauto2',
    },
    // QAuto2 user credentials (requirement #3 — store login credentials in the config)
    env: {
        userCreds: {
            username: 'aqa_hillel_qauto2@gmail.com',
            password: 'Qwerty12345',
        },
    },
    e2e: {
        ...baseConfig.e2e,
        baseUrl: 'https://qauto2.forstudy.space',
        // registration (HW 20) and queries (HW 19) are qauto-only specs.
        // Only the garage/expenses spec (HW 21) is meant to run against qauto2.
        excludeSpecPattern: ['**/registration.test.js', '**/queries.test.js'],
    },
});