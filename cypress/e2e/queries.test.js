/// <reference types="cypress" />

describe('Header and Footer elements - Cypress queries', () => {
    beforeEach(() => {
        // visit overwrite in commands.js passes basicAuth from env (guest/welcome2qauto)
        cy.visit('/');
    });

    // ─── HEADER ──────────────────────────────────────────────────────────────

    describe('Header buttons and links', () => {
        it('finds the "Home" link in the header', () => {
            cy.get('header')
                .contains('.header-link', 'Home')
                .should('be.visible')
                .and('have.attr', 'href', '/');
        });

        it('finds the "About" button in the header', () => {
            cy.get('header')
                .contains('button.header-link', 'About')
                .should('be.visible')
                .and('be.enabled');
        });

        it('finds the "Contacts" button in the header', () => {
            cy.get('header')
                .contains('button.header-link', 'Contacts')
                .should('be.visible')
                .and('be.enabled');
        });

        it('finds the "Guest log in" button in the header', () => {
            cy.get('header')
                .find('.header-link.-guest')
                .should('be.visible')
                .and('have.text', 'Guest log in');
        });

        it('finds the "Sign In" button in the header', () => {
            cy.get('header')
                .find('button.header_signin')
                .should('be.visible')
                .and('have.text', 'Sign In');
        });

        it('finds the header logo', () => {
            cy.get('header')
                .find('a.header_logo')
                .should('be.visible')
                .and('have.attr', 'href', '/');
        });

        it('finds all clickable elements in the header', () => {
            cy.get('header').find('a.header_logo, .header-link').should('have.length', 5);
        });
    });

    // ─── FOOTER / CONTACTS ───────────────────────────────────────────────────

    describe('Footer links and buttons', () => {
        const socialNetworks = [
            { name: 'Facebook', href: 'https://www.facebook.com/Hillel.IT.School' },
            { name: 'Telegram', href: 'https://t.me/ithillel_kyiv' },
            {
                name: 'YouTube',
                href: 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1',
            },
            { name: 'Instagram', href: 'https://www.instagram.com/hillel_itschool/' },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/school/ithillel/' },
        ];

        it('finds all 5 social network links', () => {
            cy.get('.contacts_socials .socials_link').should('have.length', 5);
        });

        socialNetworks.forEach(({ name, href }) => {
            it(`finds the ${name} social link with correct href`, () => {
                cy.get('.contacts_socials')
                    .find(`a[href="${href}"]`)
                    .should('be.visible')
                    .and('have.attr', 'href', href);
            });
        });

        it('finds the "ithillel.ua" website link', () => {
            cy.contains('a.contacts_link', 'ithillel.ua')
                .should('be.visible')
                .and('have.attr', 'href', 'https://ithillel.ua');
        });

        it('finds the "support@ithillel.ua" email link', () => {
            cy.contains('a.contacts_link', 'support@ithillel.ua')
                .should('be.visible')
                .and('have.attr', 'href')
                .and('include', 'mailto:');
        });

        it('finds the footer logo', () => {
            cy.get('footer').find('a.footer_logo').should('exist').and('have.attr', 'href', '/');
        });

        it('finds all contact links (website + email)', () => {
            cy.get('a.contacts_link').should('have.length', 2);
        });
    });
});