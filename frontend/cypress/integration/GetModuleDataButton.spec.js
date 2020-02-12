import { loginToApp } from "./data-home.spec";

describe("Test Button", () => {
  before(() => {
    loginToApp();
    cy.get(".allDataUploadLink").click();
  });

  it("Checks if button exists", () => {
    cy.get("[data-cy-getdata-button]").contains("Get All Grades");
  });

  it("Single Click", () => {
    cy.get("[data-cy-getdata-button]").click();
  });

  it("Double clicks the button", () => {
    cy.get("[data-cy-getdata-button]").click();
    cy.get("[data-cy-getdata-button]").click();
  });
});
