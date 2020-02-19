import { loginToApp } from "./data-home.spec";
const VISIT_URL = "http://localhost:3000/";
const ROSTER_URL = "http://localhost:3000/upload-student-roster";
const MODULE_URL = "http://localhost:3000/upload-module-marks";
const ALL_DATA_URL = "http://localhost:3000/view-all-data";

describe("The Three Main Navigation Buttons Work", () => {
  beforeEach(() => {
    cy.visit(VISIT_URL);
    loginToApp();
  });

  it("Navigates to the Roster Upload Page", () => {
    cy.get(".rosterUploadLink").click();
    cy.url().should("contain", ROSTER_URL);
  });
  it("Navigates to the Module Marks Upload Page", () => {
    cy.get(".marksUploadLink").click();
    cy.url().should("contain", MODULE_URL);
  });
  it("Navigates to the View All Data Page", () => {
    cy.get(".allDataUploadLink").click();
    cy.url().should("contain", ALL_DATA_URL);
  });
});
