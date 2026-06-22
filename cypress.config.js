const { defineConfig } = require('cypress');

module.exports = defineConfig({
    allowCypressEnv: true,
    retries: {
        runMode: 1,
        openMode: 0,
    },
    video: true,
    viewportHeight: 720,
    viewportWidth: 1080,

    env: {
        basicAuth: {
            username: 'guest',
            password: 'welcome2qauto',
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