describe('Random Joke Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/randomJoke');
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    

    it('should display a random joke', () => {
        cy.intercept('POST', '**/graphql', {
            fixture: 'randomJoke.json'
        }).as('randomJokeQuery');

        cy.wait('@randomJokeQuery');

        cy.get('div.w-5\\/6.h-80 h1').should('have.length.greaterThan', 0);
    });

    it('should fetch a new random joke when New random joke button is clicked', () => {
        cy.intercept('POST', '**/graphql', {
            fixture: 'randomJoke.json'
        }).as('randomJokeQuery');

        cy.wait('@randomJokeQuery');

        cy.intercept('POST', '**/graphql', {
            fixture: 'newRandomJoke.json'
        }).as('newRandomJokeQuery');

        cy.contains('New random joke').click();

        cy.wait('@newRandomJokeQuery');

        cy.get('div.w-5\\/6.h-80 h1').should('contain', 'Chuck Norris');
    });

    it('should navigate back when Go back button is clicked', () => {
        cy.contains('Go back').click();
        cy.url().should('not.include', '/randomJoke');
    });
});
