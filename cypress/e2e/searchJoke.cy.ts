/// <reference types="cypress" />

describe('Search Joke', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/searchJoke');
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
  });
  
    it('should display the search input and buttons', () => {
      cy.contains('Type a word to search for a joke');
      cy.get('input[placeholder="Type a word"]').should('be.visible');
      cy.contains('Go back').should('be.visible');
      cy.contains('Search').should('be.visible');
    });
  
    it('should perform a search and display results', () => {
      cy.intercept('POST', '**/graphql', {
        fixture: 'searchJokes.json'
      }).as('searchJokesQuery');
  
      cy.get('input[placeholder="Type a word"]').type('Chuck Norris');
      cy.contains('Search').click();
      
      cy.wait('@searchJokesQuery');
      
      cy.get('.overflow-y-auto h1').should('have.length.greaterThan', 0);
    });
  
    it('should navigate back when Go back button is clicked', () => {
      cy.contains('Go back').click();
      cy.url().should('not.include', '/searchJoke');
    });
  });
  