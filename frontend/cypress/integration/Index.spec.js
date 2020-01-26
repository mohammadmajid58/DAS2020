const HOME_PAGE = "http://localhost:3000/";

describe("Index", () => {
  it("shows page title as DAS 2020", () => {
    cy.visit(HOME_PAGE);
    cy.title().should("eq", "DAS 2020");
  });
});
