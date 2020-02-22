import { loginToApp } from "./data-home.spec";

describe("Final Data Table Loads", () => {
  beforeEach(() => {
    loginToApp();
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-final-awards]")
      .contains("Final Awards")
      .click();
  });

  it("Has a Final Data Table", () => {
    cy.get(".finalDataTable");
  });

  it("Displays the Empty Table Correctly", () => {
    cy.get(".finalDataTable")
      .find("tbody")
      .find("tr")
      .should("have.length", 2);
    cy.get(".finalDataTable")
      .find("tbody")
      .find("td")
      .should("contain", "No records to display");
  });
});

describe("Final Data Table Displays Data Correctly", () => {
  before(() => {
    loginToApp();
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-final-awards]")
      .contains("Final Awards")
      .click();
  });

  it("Has the correct number of entries", () => {
    cy.get(".finalDataTable")
      .find("tfoot")
      .contains("1-0 of 0");
  });
});
