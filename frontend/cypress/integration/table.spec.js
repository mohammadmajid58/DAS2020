import { loginToApp } from "./data-home.spec";

const SERVER_URL = "http://127.0.0.1:8000";

const emptyData = [];
const smallData = [
  {
    courseCode: "ORGCHEM",
    matricNo: "1000007",
    alphanum: "A1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000008",
    alphanum: "A2"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000009",
    alphanum: "B1"
  }
];
const twoDegreeData = [
  {
    courseCode: "ORGCHEM",
    matricNo: "1000007",
    alphanum: "A1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000008",
    alphanum: "A2"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000009",
    alphanum: "B1"
  },
  {
    courseCode: "INORG",
    matricNo: "1000010",
    alphanum: "A1"
  },
  {
    courseCode: "INORG",
    matricNo: "1000011",
    alphanum: "A2"
  },
  {
    courseCode: "INORG",
    matricNo: "1000012",
    alphanum: "B1"
  }
];
const largeData = [
  {
    courseCode: "ORGCHEM",
    matricNo: "1000007",
    alphanum: "A1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000008",
    alphanum: "A2"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000009",
    alphanum: "B1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000010",
    alphanum: "C3"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000011",
    alphanum: "C1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000012",
    alphanum: "D2"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000013",
    alphanum: "A1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000014",
    alphanum: "D1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000016",
    alphanum: "E1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000017",
    alphanum: "C1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000018",
    alphanum: "C2"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000019",
    alphanum: "D2"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000020",
    alphanum: "B1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000021",
    alphanum: "C3"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000022",
    alphanum: "C1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000023",
    alphanum: "A1"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000024",
    alphanum: "B3"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000025",
    alphanum: "D3"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000026",
    alphanum: "C3"
  },
  {
    courseCode: "ORGCHEM",
    matricNo: "1000027",
    alphanum: "D2"
  }
];

describe("Database Table Loads", () => {
  before(() => {
    loginToApp();
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-module-marks]").click();
  });

  it("Has a Database Table", () => {
    cy.get(".databaseTable");
  });

  it("Displays the Empty Table Correctly", () => {
    cy.get(".databaseTable")
      .find("tbody")
      .find("tr")
      .should("have.length", 2);
    cy.get(".MuiTableBody-root")
      .find("td")
      .should("contain", "No records to display");
  });
});

describe("Database Table Renders Data", () => {
  beforeEach(() => {
    loginToApp();
    cy.server();
  });

  it("Handles No Data", () => {
    cy.route({
      url: `${SERVER_URL}/api/grades/`,
      response: emptyData,
      method: "GET",
      status: 200
    }).as("getNoData");
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-module-marks]").click();
    cy.wait(["@getNoData"]);

    cy.get(".databaseTable")
      .find("tbody")
      .find("tr")
      .should("have.length", 2);
    cy.get(".MuiTableBody-root")
      .find("td")
      .should("contain", "No records to display");
  });

  it("Handles A Data Request", () => {
    cy.route({
      url: `${SERVER_URL}/api/grades/`,
      response: smallData,
      method: "GET",
      status: 200
    }).as("getSmallData");
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-module-marks]").click();
    cy.wait("@getSmallData");
    cy.get("span.MuiTypography-root").should("contain", "1-3 of 3");
  });
});

describe("Database Table Pagination Works", () => {
  beforeEach(() => {
    loginToApp();
    cy.server();
    cy.route({
      url: `${SERVER_URL}/api/grades/`,
      response: largeData,
      method: "GET",
      status: 200
    }).as("getBigData");

    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-module-marks]").click();
    cy.wait(["@getBigData"]);
  });

  it("Can Move to Next/Previous Page", () => {
    cy.get(".databaseTable")
      .find("tfoot")
      .find("span[title='Next Page']")
      .click();
    cy.get(".databaseTable")
      .find(".MuiTypography-root")
      .should("contain", "11-20 of 20");
    cy.get(".databaseTable")
      .find("span[title='Previous Page']")
      .click();
    cy.get(".databaseTable")
      .find(".MuiTypography-root")
      .should("contain", "1-10 of 20");
  });

  it("Can Move to First/Last Page", () => {
    cy.get(".databaseTable")
      .find("tfoot")
      .find("span[title='Last Page']")
      .click();
    cy.get(".databaseTable")
      .find("span.MuiTypography-root")
      .should("contain", "11-20 of 20");
    cy.get(".databaseTable")
      .find("span[title='First Page']")
      .click();
    cy.get(".databaseTable")
      .find("span.MuiTypography-root")
      .should("contain", "1-10 of 20");
  });
});

describe("Database Table Filtering Works", () => {
  beforeEach(() => {
    loginToApp();
    cy.server();
    cy.route({
      url: `${SERVER_URL}/api/grades/`,
      response: twoDegreeData,
      method: "GET",
      status: 200
    }).as("getSmallData");
    cy.get("[data-cy=view-data-dropdown]").click();
    cy.get("[data-cy=view-module-marks]").click();

    cy.wait(["@getSmallData"]);
  });

  it("Has Correct Number of Discrete Options for Course Code and Grade", () => {
    cy.get(".databaseTable")
      .find(".MuiFormControl-root")
      .first()
      .click();
    cy.get("ul.MuiList-root")
      .children()
      .should("have.length", 2);

    cy.get("div#menu-.MuiPopover-root").click("topRight");
    cy.get(".databaseTable")
      .find(".MuiFormControl-root")
      .last()
      .click();
    cy.get("ul.MuiList-root")
      .children()
      .should("have.length", 3);
  });

  it("Filters the Course Code", () => {
    cy.get(".MuiFormControl-root")
      .first()
      .click();
    cy.get("ul.MuiList-root")
      .children()
      .first()
      .click();
    cy.get("div#menu-.MuiPopover-root").click();

    cy.get(".MuiFormControl-root")
      .first()
      .should("contain", "INORG");
    for (var index = 0; index < 3; index++) {
      cy.get(`tr[index=${index}]`)
        .children()
        .first()
        .should("contain", "INORG");
    }
    cy.get("span.MuiTypography-root").should("contain", "1-3 of 3");
  });

  it("Filters the Grade", () => {
    cy.get(".databaseTable")
      .find(".MuiFormControl-root")
      .eq(2)
      .click();
    cy.get("ul.MuiList-root")
      .children()
      .first()
      .click();
    cy.get("div#menu-.MuiPopover-root").click();

    cy.get(".databaseTable")
      .find(".MuiFormControl-root")
      .eq(2)
      .should("contain", "A1");
    for (var index = 0; index < 2; index++) {
      cy.get(`tr[index=${index}]`)
        .children()
        .eq(2)
        .should("contain", "A1");
    }
    cy.get("span.MuiTypography-root").should("contain", "1-2 of 2");
  });

  it("Filters the Matric Number", () => {
    cy.get(".databaseTable")
      .find(".MuiInputBase-inputTypeSearch")
      .type("1000009");
    cy.get(".databaseTable")
      .find(".MuiInputBase-inputTypeSearch")
      .should("contain.value", "1000009");
    // Only to allow the table to rerender after the query filter
    cy.wait(50);
    for (var index = 0; index < 1; index++) {
      cy.get(`tr[index=${index}]`)
        .children()
        .first()
        .next()
        .should("contain.text", "1000009");
    }
  });
});
