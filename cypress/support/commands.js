// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    return originalFn(url, {
        auth: Cypress.env('basicAuth'),
        ...options,
    });
});