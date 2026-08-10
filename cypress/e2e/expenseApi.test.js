/// <reference types="cypress" />

import { GaragePage } from '../support/pages/garagePage';

const garagePage = new GaragePage();

// Expense date must not be earlier than the car creation date, and the car is
// created during the test run — so always report it for today (UTC, as the API uses GMT).
const today = () => new Date().toISOString().split('T')[0];

describe('Create expense via API', () => {
    const carData = { brand: 'Audi', model: 'TT', mileage: '100' };

    const expenseData = {
        reportedAt: today(),
        mileage: 200 + (Date.now() % 100000),
        liters: 20,
        totalCost: 1000,
    };

    let createdCarId;

    beforeEach(() => {
        const { username, password } = Cypress.env('userCreds');
        cy.visit('/');
        cy.login(username, password);
        cy.url().should('include', '/panel/garage');

        // Prepare a car (via UI) and capture its id from the interception
        cy.intercept('POST', '/api/cars').as('createCar');
        garagePage.addCar(carData.brand, carData.model, carData.mileage);
        cy.wait('@createCar').then(({ response }) => {
            createdCarId = response.body.data.id;
        });
    });

    it('creates an expense via API and validates status + response body (task #4)', () => {
        cy.createExpenseApi(createdCarId, expenseData).then((response) => {
            // Validate status code
            expect(response.status).to.eq(200);

            // Validate response body correctness
            expect(response.body.status).to.eq('ok');
            const data = response.body.data;
            expect(data).to.have.property('id');
            expect(data.carId).to.eq(createdCarId);
            expect(data.reportedAt).to.eq(expenseData.reportedAt);
            expect(data.mileage).to.eq(expenseData.mileage);
            expect(data.liters).to.eq(expenseData.liters);
            expect(data.totalCost).to.eq(expenseData.totalCost);
        });
    });
});