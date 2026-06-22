/// <reference types="cypress" />

import { GaragePage } from '../support/pages/garagePage';
import { ExpensesPage } from '../support/pages/expensesPage';

const garagePage = new GaragePage();
const expensesPage = new ExpensesPage();

describe('Garage and Fuel expenses (POM)', () => {
    beforeEach(() => {
        // User credentials come from the config env (different for qauto / qauto2).
        const { username, password } = Cypress.env('userCreds');
        cy.visit('/');
        cy.login(username, password);
        cy.url().should('include', '/panel/garage');
    });

    it('adds a new car in the Garage section', () => {
        garagePage.addCar('Audi', 'TT', '100');

        garagePage.selectors.firstCarName().should('be.visible').and('contain.text', 'Audi TT');
    });

    it('adds a fuel expense to the created car', () => {
        // Make sure there is at least one car before adding an expense
        garagePage.selectors.carNames().then(($cars) => {
            if ($cars.length === 0) {
                garagePage.addCar('Audi', 'TT', '100');
            }
        });

        garagePage.openFuelExpense();
        expensesPage.addFuelExpense('150', '20', '1000');

        expensesPage.selectors.expenseRows().should('have.length.greaterThan', 0);
    });
});