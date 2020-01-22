const VISIT_URL = "http://localhost:3000/view-all-data";

describe("Final Data Table Loads", () => {
  before(() => {
    cy.visit(VISIT_URL);
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

describe("Final Data Table Displays Data Correctly", () => {
  before(() => {
    cy.visit(VISIT_URL);
    cy.get("[ data-cy-toggle-button]").click();
    cy.get(".getFinalDataButton").click();
  });

  it("Has the correct number of entries", () => {
    cy.get(".finalDataTable")
      .find("tfoot")
      .contains("1-0 of 0");
  });
});
