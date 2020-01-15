import { createYield } from "typescript";
const VISIT_URL = "http://localhost:3000/view-all-data";

describe("Test Button", () => {
  it("Loads the page", () => {
    cy.visit(VISIT_URL);
  });

  it("Checks if button exists", () => {
    cy.get("[data-cy-getdata-button]").contains("Get All Grades");
  });

  it("Single Click", () => {
    cy.get("[data-cy-getdata-button]").click();
  });

  it("Double click the button", () => {
    cy.visit(VISIT_URL);
  });
  it("Double clicks", () => {
    cy.get("[data-cy-getdata-button]").click();
    cy.get("[data-cy-getdata-button]").click();
  });
});
