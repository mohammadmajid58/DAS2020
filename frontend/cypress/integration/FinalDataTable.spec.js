// const SERVER_URL = "http://127.0.0.1:8000";
const VISIT_URL = "http://127.0.0.1:3000";

describe("Final Data Table Loads", () => {
  before(() => {
    cy.visit(VISIT_URL);
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
    cy.get(".getFinalDataButton").click();
  });

  it("Has the correct number of entries", () => {
    cy.get(".finalDataTable")
      .find("tfoot")
      .contains("1-4 of 4");
  });

  it("Has the correct Matric Numbers", () => {
    cy.get('tr[index="0"')
      .children()
      .first()
      .should("contain", "1234567");
    cy.get('tr[index="1"')
      .children()
      .first()
      .should("contain", "1234568");
    cy.get('tr[index="2"')
      .children()
      .first()
      .should("contain", "1234569");
    cy.get('tr[index="3"')
      .children()
      .first()
      .should("contain", "1234570");
  });
});
