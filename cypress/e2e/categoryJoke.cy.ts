/// <reference types="cypress" />

describe('Category Joke Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/categoryJoke');
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('should display the category selection', () => {
      cy.intercept('POST', '**/graphql', {
        fixture: 'allCategories.json'
      }).as('allCategoriesQuery');
  
      cy.wait('@allCategoriesQuery');
      
      cy.get('button[class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[180px]"]').should('be.visible');
    });
  
    it('should fetch and display a joke by selected category', () => {
      cy.intercept('POST', '**/graphql', {
        fixture: 'categoryJoke.json'
      }).as('categoryJokeQuery');
  
      cy.get('button[class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[180px]"]').should('be.visible');
      cy.contains('Get joke').click(); 

      cy.wait('@categoryJokeQuery');
      
      cy.get('.w-5\\/6.h-80 h1').should('contain', 'Chuck Norris joke');
    });
  
    it('should navigate back when Go back button is clicked', () => {
      cy.contains('Go back').click();
      cy.url().should('not.include', '/categoryJoke');
    });
  });
  