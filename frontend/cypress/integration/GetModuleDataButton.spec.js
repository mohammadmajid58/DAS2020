import { createYield } from "typescript";

describe("Test Button", () => {
  it("Loads the page", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Checks if button exists", () => {
    cy.get("[data-cy-getdata-button]").contains("Get All Grades");
  });

  it("Single Click", () => {
    cy.get("[data-cy-getdata-button]").click();
  });

  it("Double click the button", () => {
    cy.visit("http://localhost:3000/");
  });
  it("Double clicks", () => {
    cy.get("[data-cy-getdata-button]").click();
    cy.get("[data-cy-getdata-button]").click();
  });
});
