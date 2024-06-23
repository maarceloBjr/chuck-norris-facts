describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
  
    it('should display the main headers', () => {
      cy.get('h1').contains("Chuck Norris doesn't welcome you.");
      cy.get('h1').contains('You welcome Chuck Norris.');
      cy.get('h1').contains('This website will show you who Chuck Norris really is.');
    });
  
    it('should navigate to random joke page when Random button is clicked', () => {
      cy.contains('Random').click();
      cy.url().should('include', '/randomJoke');
    });
  
    it('should navigate to category joke page when By category button is clicked', () => {
      cy.contains('By category').click();
      cy.url().should('include', '/categoryJoke');
    });
  
    it('should navigate to search joke page when Free search button is clicked', () => {
      cy.contains('Free search').click();
      cy.url().should('include', '/searchJoke');
    });
  });
  