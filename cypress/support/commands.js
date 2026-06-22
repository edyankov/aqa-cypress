// ***********************************************
// Custom commands and overwrites
// ***********************************************

// Import the cypress-xpath plugin — adds the cy.xpath() command
import 'cypress-xpath';

// ─── cy.env([...]) — custom command ──────────────────────────────────────────
// Accepts an array of keys and returns an object containing
// the corresponding values from Cypress.env().
// Enables syntax such as:
// cy.env(['defaultUserCreds']).then(({ defaultUserCreds }) => {...})
Cypress.Commands.add('getEnv', (keys) => {
    const result = {};
    keys.forEach((key) => {
        result[key] = Cypress.env(key);
    });
    return cy.wrap(result, { log: false });
});

// ─── Cypress.expose — custom implementation ──────────────────────────────────
// Cypress does not provide expose() by default.
// Implement it as an alias for Cypress.env(),
// simply returning the value associated with the given key.
// Enables syntax such as: Cypress.expose('basicAuth')
Cypress.expose = (key) => Cypress.env(key);

// ─── Custom login() command (Task 4) ─────────────────────────────────────────
// Login via UI using XPath to locate the Sign In button
Cypress.Commands.add('login', (username, password) => {
    cy.xpath("//button[contains(text(), 'Sign In')]").click();

    cy.get('[class="modal-content"]').within(() => {
        cy.get('input[id="signinEmail"]').type(username);
        cy.get('input[id="signinPassword"]').type(password, { sensitive: true });

        cy.contains('button', 'Login')
            .should('be.enabled')
            .click();
    });
});

// ─── Overwrite visit — always pass basicAuth ─────────────────────────────────
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    return originalFn(url, {
        auth: Cypress.expose('basicAuth'),
        ...options,
    });
});

// ─── Overwrite type — mask passwords in logs (Task 5) ───────────────────────
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        // Disable the default log
        options.log = false;

        // Create a custom log with masked text
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }

    return originalFn(element, text, options);
});

// ─── Custom query: getByClassName ────────────────────────────────────────────
Cypress.Commands.addQuery('getByClassName', function getByClassName(name) {
    return () => {
        return Cypress.$(`[class*="${name}"]`);
    };
});