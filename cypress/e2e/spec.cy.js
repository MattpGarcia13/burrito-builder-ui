describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.intercept('http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: {
        orders: [
          {
            id: 1,
            name: 'squidward',
            ingredients: ['exampleone', 'exampletwo', 'examplethree']
          }
        ]
      }
    }).as('apiRequest')
    cy.wait('@apiRequest')
  });

  it('verify user can sumbit order', () => {
    cy.get('.form-name').type('patrick');
    cy.get('.steak-button').click();
    cy.get('.guacamole-button').click();
    cy.get('.submit-button').click();
    cy.get('.order').eq(1).should('contain', 'patrick');
    cy.get('.steak-name').should('contain', "steak");
    cy.get('.guacamole-name').should('contain', "guacamole");
  });

  it('verify form error handling for name', () => {
    cy.get('.steak-button').click();
    cy.get('.guacamole-button').click();
    cy.get('.submit-button').click();
    cy.get('.order').should('have.length', 1);
  });

  it('verify form error handling for ingredients', () => {
    cy.get('.form-name').type('sandy');
    cy.get('.submit-button').click();
    cy.get('.order').should('have.length', 1);
  });

  it("verify ingredients have loaded", () => {
    cy.get('.order').eq(0).should('contain', 'squidward');
    cy.get('.exampleone-name').should('contain', 'exampleone');
    cy.get('.exampletwo-name').should('contain', 'exampletwo');
    cy.get('.examplethree-name').should('contain', 'examplethree');
  });

  it("verify form has loaded", () => {
    cy.get('form').should('exist');
    cy.get('.form-name').should('exist');
    cy.get('.guacamole-button').should('exist');
    cy.get('.steak-button').should('exist');
    cy.get('.lettuce-button').should('exist');
    cy.get('.submit-button').should('exist');
  });
});