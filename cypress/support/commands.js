// ***********************************************
// Custom commands and overwrites
// ***********************************************

import 'cypress-xpath';

// Basic auth credentials are stored in cypress/fixtures/basicAuth.json.
// Load them once before the spec runs so the visit overwrite can use them synchronously.
let basicAuth;

before(() => {
    cy.fixture('basicAuth').then((creds) => {
        basicAuth = creds;
    });
});

// Custom login() command — logs in via UI (uses xpath for the Sign In button)
Cypress.Commands.add('login', (username, password) => {
    cy.xpath("//button[contains(text(), 'Sign In')]").click();
    cy.get('[class="modal-content"]').within(() => {
        cy.get('input[id="signinEmail"]').type(username);
        cy.get('input[id="signinPassword"]').type(password, { sensitive: true });
        cy.contains('button', 'Login').should('be.enabled').click();
    });
});

// Overwrite visit — always pass basicAuth loaded from the fixture
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    return originalFn(url, {
        auth: basicAuth,
        ...options,
    });
});

// Overwrite type — mask password values in Cypress logs
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false;
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }
    return originalFn(element, text, options);
});
