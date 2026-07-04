/// <reference types="cypress" />

import { GaragePage } from '../support/pages/garagePage';

const garagePage = new GaragePage();

describe('Car creation & Expense - API and UI', () => {
    // Test data used both for UI creation and API validation
    const carData = {
        brand: 'Audi',
        model: 'TT',
        mileage: '100',
        expectedName: 'Audi TT',
    };

    // Expense mileage must be >= car mileage and unique among today's expenses,
    // so we make it unique per run to avoid the "mileage must not be equal" 400 error
    const expenseData = {
        reportedAt: '2026-07-04',
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
    });

    it('creates a car via UI and intercepts POST /api/cars (task #2)', () => {
        // Interception must be set up BEFORE the action that triggers the request
        cy.intercept('POST', '/api/cars').as('createCar');

        garagePage.addCar(carData.brand, carData.model, carData.mileage);

        // Validate status code and store the created car id
        cy.wait('@createCar').then(({ response }) => {
            expect(response.statusCode).to.eq(201);
            expect(response.body.status).to.eq('ok');
            expect(response.body.data).to.have.property('id');

            createdCarId = response.body.data.id;
            cy.wrap(createdCarId).as('carId');
        });

        garagePage.selectors
            .firstCarName()
            .should('be.visible')
            .and('contain.text', carData.expectedName);
    });

    it('GET /api/cars contains the car created via UI (task #3)', () => {
        cy.getCarsApi().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('ok');

            // Find the created car by the id captured from interception
            const car = response.body.data.find((c) => c.id === createdCarId);
            expect(car, 'created car is present in the list').to.exist;
            // Validate by the data entered via UI
            expect(car.brand).to.eq(carData.brand);
            expect(car.model).to.eq(carData.model);
            expect(car.mileage).to.eq(Number(carData.mileage));
        });
    });

    it('creates an expense via API and validates it through the UI (task #5)', () => {
        // Create the expense via API first
        cy.createExpenseApi(createdCarId, expenseData).then((response) => {
            expect(response.status).to.eq(200);
        });

        // Find the needed car via the filter on the Fuel expenses page
        cy.visit('/panel/expenses');
        cy.contains('button', carData.expectedName).should('be.visible');

        // Validate the expense row.
        // UI shows liters as "20L" and cost as "1000.00 USD".
        cy.get('table.expenses_table tbody tr')
            .should('have.length.greaterThan', 0)
            .first()
            .within(() => {
                cy.contains(`${expenseData.liters}L`).should('exist');
                cy.contains(`${expenseData.totalCost}.00 USD`).should('exist');
            });
    });
});