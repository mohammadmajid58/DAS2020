import { loginToApp } from "./data-home.spec";

describe("Final Data Table Loads", () => {
  beforeEach(() => {
    loginToApp();

    cy.get(".allDataUploadLink").click();
    cy.get("[ data-cy-toggle-button]").click();
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
