import { createYield } from "typescript";

const VISITURL = "http://localhost:3000/view-all-data";

describe("Test Button", () => {
  it("Loads the page", () => {
    cy.visit(VISITURL);
  });

  it("Checks if button exists", () => {
    cy.get("[ data-cy-toggle-button]").contains("Get Student Final Grades");
  });

  it("Single Click", () => {
    cy.get("[data-cy-toggle-button]")
      .click()
      .contains("Get Student Module Grades");
  });

  it("Double click the button", () => {
    cy.visit(VISITURL);
  });
  it("Double clicks", () => {
    cy.get("[data-cy-toggle-button]")
      .click()
      .contains("Get Student Module Grades");
    cy.get("[data-cy-toggle-button]")
      .click()
      .contains("Get Student Final Grades");
  });

  describe("Loads the right table with button click", () => {
    it("Loads Student Module table when the page loads", () => {
      cy.visit(VISITURL).get(".databaseTable");
    });
    it("Loads final award table once the button is clicked", () => {
      cy.get("[data-cy-toggle-button]")
        .click()
        .get(".finalDataTable");
    });
  });
});