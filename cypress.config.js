const { defineConfig } = require('cypress');
const { baseConfig } = require('./config.base');

module.exports = defineConfig({
    ...baseConfig,
    e2e: {
        ...baseConfig.e2e,
        baseUrl: 'https://qauto.forstudy.space',
    },
});