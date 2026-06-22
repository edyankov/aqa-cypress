/// <reference types="cypress" />

export class GaragePage {
    selectors = {
        addCarButton: () => cy.contains('button', 'Add car'),
        brandSelect: () => cy.get('#addCarBrand'),
        modelSelect: () => cy.get('#addCarModel'),
        mileageInput: () => cy.get('#addCarMileage'),
        submitButton: () => cy.contains('.modal-content button', 'Add'),
        carNames: () => cy.get('.car_name'),
        firstCarName: () => cy.get('.car_name').first(),
        addFuelExpenseButton: () => cy.get('.car_add-expense').first(),
    };

    open() {
        cy.visit('/panel/garage');
    }

    clickAddCar() {
        this.selectors.addCarButton().click();
    }

    addCar(brand, model, mileage) {
        this.clickAddCar();
        this.selectors.brandSelect().select(brand);
        this.selectors.modelSelect().select(model);
        this.selectors.mileageInput().clear().type(mileage);
        this.selectors.submitButton().click();
    }

    openFuelExpense() {
        this.selectors.addFuelExpenseButton().click();
    }
}