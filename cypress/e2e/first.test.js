describe('First Cypress Test', () => {
    it('should visit the example page', () => {
        cy.visit('/');
        cy.contains('Kitchen Sink');
    });
});
