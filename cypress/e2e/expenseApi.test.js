/// <reference types="cypress" />

// Basic auth for API requests (the site is behind guest / welcome2qauto).
// cy.request does NOT go through the visit overwrite, so we pass auth explicitly.
const API_AUTH = { username: 'guest', password: 'welcome2qauto' };

// Audi TT — ids come from GET /api/cars/brands and GET /api/cars/models
const CAR_PAYLOAD = { carBrandId: 1, carModelId: 1, mileage: 100 };

// Expense date must not be earlier than the car creation date, and the car is
// created during the test run — so always report it for today (UTC, the API uses GMT).
const today = () => new Date().toISOString().split('T')[0];

describe('Create expense via API', () => {
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

        // Prepare a car via API. This spec is about the expense endpoint, so the car
        // is just a fixture — creating it through the UI only adds flakiness.
        cy.request({
            method: 'POST',
            url: '/api/cars',
            auth: API_AUTH,
            body: CAR_PAYLOAD,
            failOnStatusCode: false,
        }).then((response) => {
            // The body goes into the assertion message, so a server-side rejection
            // shows its actual reason instead of a bare "undefined" error.
            expect(response.status, JSON.stringify(response.body)).to.eq(201);
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
