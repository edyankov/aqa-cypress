/// <reference types="cypress" />

// Constants
const VALID_PASSWORD = 'Qwerty12345';
const VALID_NAME = 'John';
const VALID_LAST_NAME = 'Doe';
const RED_BORDER = 'rgb(220, 53, 69)';
const GARAGE_URL = 'https://qauto.forstudy.space/panel/garage';

// Unique email with a prefix to avoid collisions during registration
const uniqueEmail = () => `aqa_hillel_${Date.now()}@gmail.com`;

// Open the registration modal (the "Sign up" button on the landing page).
// cy.visit without auth — the overwritten visit injects basicAuth from env.
const openRegistration = () => {
    cy.visit('/');
    cy.contains('button', 'Sign up').click();
    cy.get('[class="modal-content"]').should('be.visible');
    cy.contains('.modal-content h4', 'Registration').should('be.visible');
};

// Helper: make a field "touched + dirty" without leaving a value
// (otherwise an empty field never gets the is-invalid class and the border stays grey)
const triggerEmpty = (selector) => {
    cy.get(selector).type(' ').clear().blur();
};

// ─── Field "Name" ─────────────────────────────────────────────────────────────

describe('Registration form - Field "Name"', () => {
    beforeEach(openRegistration);

    it('shows "Name required" and red border when empty', () => {
        triggerEmpty('#signupName');
        cy.get('#signupName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Name required');
        cy.get('#signupName').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows "Name is invalid" for wrong data', () => {
        cy.get('#signupName').type('John123').blur();
        cy.get('#signupName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Name is invalid');
        cy.get('#signupName').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows length error when Name is shorter than 2 chars', () => {
        cy.get('#signupName').type('J').blur();
        cy.get('#signupName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Name has to be from 2 to 20 characters long');
        cy.get('#signupName').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows length error when Name is longer than 20 chars', () => {
        cy.get('#signupName').type('Johnnnnnnnnnnnnnnnnnnn').blur();
        cy.get('#signupName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Name has to be from 2 to 20 characters long');
        cy.get('#signupName').should('have.css', 'border-color', RED_BORDER);
    });

    it('accepts valid Name (no error)', () => {
        cy.get('#signupName').type('John').blur();
        cy.get('#signupName').should('not.have.class', 'is-invalid');
    });
});

// ─── Field "Last name" ────────────────────────────────────────────────────────

describe('Registration form - Field "Last name"', () => {
    beforeEach(openRegistration);

    it('shows "Last name required" and red border when empty', () => {
        triggerEmpty('#signupLastName');
        cy.get('#signupLastName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Last name required');
        cy.get('#signupLastName').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows "Last name is invalid" for wrong data', () => {
        cy.get('#signupLastName').type('Doe123').blur();
        cy.get('#signupLastName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Last name is invalid');
        cy.get('#signupLastName').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows length error when Last name is shorter than 2 chars', () => {
        cy.get('#signupLastName').type('D').blur();
        cy.get('#signupLastName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Last name has to be from 2 to 20 characters long');
        cy.get('#signupLastName').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows length error when Last name is longer than 20 chars', () => {
        cy.get('#signupLastName').type('Doeeeeeeeeeeeeeeeeeeee').blur();
        cy.get('#signupLastName')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Last name has to be from 2 to 20 characters long');
        cy.get('#signupLastName').should('have.css', 'border-color', RED_BORDER);
    });

    it('accepts valid Last name (no error)', () => {
        cy.get('#signupLastName').type('Doe').blur();
        cy.get('#signupLastName').should('not.have.class', 'is-invalid');
    });
});

// ─── Field "Email" ──────────────────────────────────────────────────────────────

describe('Registration form - Field "Email"', () => {
    beforeEach(openRegistration);

    it('shows "Email required" and red border when empty', () => {
        triggerEmpty('#signupEmail');
        cy.get('#signupEmail')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Email required');
        cy.get('#signupEmail').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows "Email is incorrect" for invalid format', () => {
        cy.get('#signupEmail').type('notanemail').blur();
        cy.get('#signupEmail')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', RED_BORDER);
    });

    it('accepts valid Email (no error)', () => {
        cy.get('#signupEmail').type(uniqueEmail()).blur();
        cy.get('#signupEmail').should('not.have.class', 'is-invalid');
    });
});

// ─── Field "Password" ─────────────────────────────────────────────────────────

describe('Registration form - Field "Password"', () => {
    const PW_ERROR =
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

    beforeEach(openRegistration);

    it('shows "Password required" when empty', () => {
        triggerEmpty('#signupPassword');
        cy.get('#signupPassword')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Password required');
        cy.get('#signupPassword').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows error when Password is too short (< 8 chars)', () => {
        cy.get('#signupPassword').type('Abc1', { sensitive: true }).blur();
        cy.get('#signupPassword')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', PW_ERROR);
        cy.get('#signupPassword').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows error when Password is too long (> 15 chars)', () => {
        cy.get('#signupPassword').type('Abcdefgh12345678', { sensitive: true }).blur();
        cy.get('#signupPassword')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', PW_ERROR);
        cy.get('#signupPassword').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows error when Password lacks digit/capital/small letter', () => {
        cy.get('#signupPassword').type('password', { sensitive: true }).blur();
        cy.get('#signupPassword')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', PW_ERROR);
        cy.get('#signupPassword').should('have.css', 'border-color', RED_BORDER);
    });

    it('accepts valid Password (sensitive, masked in logs)', () => {
        cy.get('#signupPassword').type(VALID_PASSWORD, { sensitive: true }).blur();
        cy.get('#signupPassword').should('not.have.class', 'is-invalid');
    });
});

// ─── Field "Re-enter password" ────────────────────────────────────────────────

describe('Registration form - Field "Re-enter password"', () => {
    beforeEach(openRegistration);

    it('shows "Re-enter password required" when empty', () => {
        triggerEmpty('#signupRepeatPassword');
        cy.get('#signupRepeatPassword')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Re-enter password required');
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', RED_BORDER);
    });

    it('shows "Passwords do not match" when passwords differ', () => {
        cy.get('#signupPassword').type(VALID_PASSWORD, { sensitive: true });
        cy.get('#signupRepeatPassword').type('Different1', { sensitive: true }).blur();
        cy.get('#signupRepeatPassword')
            .parents('.form-group')
            .find('.invalid-feedback')
            .should('be.visible')
            .and('have.text', 'Passwords do not match');
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', RED_BORDER);
    });

    it('passes when passwords match', () => {
        cy.get('#signupPassword').type(VALID_PASSWORD, { sensitive: true });
        cy.get('#signupRepeatPassword').type(VALID_PASSWORD, { sensitive: true }).blur();
        cy.get('#signupRepeatPassword').should('not.have.class', 'is-invalid');
    });
});

// ─── Button "Register" ─────────────────────────────────────────────────────────

describe('Registration form - Button "Register"', () => {
    beforeEach(openRegistration);

    it('is disabled with empty form', () => {
        cy.contains('.modal-content button', 'Register').should('be.disabled');
    });

    it('is enabled when all fields are valid', () => {
        cy.get('#signupName').type(VALID_NAME);
        cy.get('#signupLastName').type(VALID_LAST_NAME);
        cy.get('#signupEmail').type(uniqueEmail());
        cy.get('#signupPassword').type(VALID_PASSWORD, { sensitive: true });
        cy.get('#signupRepeatPassword').type(VALID_PASSWORD, { sensitive: true });
        cy.contains('.modal-content button', 'Register').should('be.enabled');
    });
});

// ─── Successful registration ───────────────────────────────────────────────────

describe('Registration form - Successful registration', () => {
    it('creates a new account and redirects to the garage', () => {
        openRegistration();
        cy.get('#signupName').type(VALID_NAME);
        cy.get('#signupLastName').type(VALID_LAST_NAME);
        cy.get('#signupEmail').type(uniqueEmail());
        cy.get('#signupPassword').type(VALID_PASSWORD, { sensitive: true });
        cy.get('#signupRepeatPassword').type(VALID_PASSWORD, { sensitive: true });
        cy.contains('.modal-content button', 'Register').should('be.enabled').click();
        cy.url().should('eq', GARAGE_URL);
    });
});

// ─── Custom login() command (task 4) ────────────────────────────────────────────

describe('Custom login() command', () => {
    it('logs in via UI using credentials from the userCreds fixture', () => {
        cy.fixture('userCreds').then(({ username, password }) => {
            cy.visit('/');
            cy.login(username, password);
        });
        cy.url().should('eq', GARAGE_URL);
    });
});