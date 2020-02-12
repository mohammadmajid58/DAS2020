import { loginToApp } from "./data-home.spec";

const VISITURL = "http://localhost:3000/view-all-data";

describe("Test Button", () => {
  beforeEach(() => {
    loginToApp();
    cy.get(".allDataUploadLink").click();
  });

  it("Checks if button exists", () => {
    cy.get("[ data-cy-toggle-button]").contains(
      "View Degree Classifications and GPAs"
    );
  });

  it("Single Click", () => {
    cy.get("[data-cy-toggle-button]")
      .click()
      .contains("View Student Course Grades");
  });

  it("Double click the button", () => {
    cy.visit(VISITURL);
  });
  it("Double clicks", () => {
    cy.get("[data-cy-toggle-button]")
      .click()
      .contains("View Student Course Grades");
    cy.get("[data-cy-toggle-button]")
      .click()
      .contains("View Degree Classifications and GPAs");
  });

  it("Loads Student Module table when the page loads", () => {
    cy.get(".databaseTable");
  });
  it("Loads final award table once the button is clicked", () => {
    cy.get("[data-cy-toggle-button]")
      .click()
      .get(".finalDataTable");
  });
});
