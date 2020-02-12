export const LOGIN_URL = "http://localhost:3000/login";
export const API_URL = "http://localhost:3000";
export const SERVER_URL = "http://127.0.0.1:8000";

export function loginToApp() {
  cy.visit(LOGIN_URL);
  cy.server();
  cy.route({
    url: "/auth/login/",
    method: "POST",
    status: 200,
    response: {}
  }).as("getLoginAuth");

  cy.get("input[id=username").type("admin");
  cy.get("input[id=password").type("123");
  cy.get("button").click();
  cy.wait(["@getLoginAuth"]);
}

describe("App Has Started", () => {
  it("Can Load The APP", () => {
    cy.visit(API_URL);
  });
});
