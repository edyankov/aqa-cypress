/// <reference types="cypress" />

export class ExpensesPage {
    selectors = {
        carSelect: () => cy.get('#addExpenseCar'),
        mileageInput: () => cy.get('#addExpenseMileage'),
        litersInput: () => cy.get('#addExpenseLiters'),
        totalCostInput: () => cy.get('#addExpenseTotalCost'),
        submitButton: () => cy.contains('.modal-content button', 'Add'),
        expenseRows: () => cy.get('table.expenses_table tbody tr'),
    };

    addFuelExpense(mileage, liters, totalCost) {
        // Do not modify the date — the addExpenseDate field is populated automatically
        this.selectors.mileageInput().clear().type(mileage);
        this.selectors.litersInput().clear().type(liters);
        this.selectors.totalCostInput().clear().type(totalCost);
        this.selectors.submitButton().click();
    }
}