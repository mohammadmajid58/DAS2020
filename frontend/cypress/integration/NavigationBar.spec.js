import { loginToApp } from "./data-home.spec";
const VISIT_URL = "http://localhost:3000/";
const ROSTER_URL = "http://localhost:3000/upload-student-roster";
const MODULE_URL = "http://localhost:3000/upload-module-marks";
const ADMIN_URL = "http://localhost:3000/admin/";

describe("The Navigation Buttons Work", () => {
  beforeEach(() => {
    cy.visit(VISIT_URL);
    loginToApp();
  });

  it("Navigates to the Roster Upload Page", () => {
    cy.get("[data-cy=upload-data-dropdown]").click();
    cy.get("[data-cy=upload-student-roster]").click();
    cy.url().should("contain", ROSTER_URL);
  });
  it("Navigates to the Module Marks Upload Page", () => {
    cy.get("[data-cy=upload-data-dropdown]").click();
    cy.get("[data-cy=upload-module-marks]").click();
    cy.url().should("contain", MODULE_URL);
  });
  it("Navigates to the View Module Marks Page", () => {
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-module-marks]").click();
  });
  it("Navigates to the View Final Awards Page", () => {
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-final-awards]").click();
  });
});
