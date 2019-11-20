const SERVER_URL = "http://127.0.0.1:8000";
const VISIT_URL = "http://localhost:3000";

const emptyData = {
  count: 0,
  next: null,
  previous: null,
  results: []
};
const smallData = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      courseCode: "ORGCHEM",
      student: "1000007",
      alphanum: "A1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000008",
      alphanum: "A2"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000009",
      alphanum: "B1"
    }
  ]
};
const pageOne = {
  count: 40,
  next: "http://127.0.0.1:8000/grades/?page=2",
  previous: null,
  results: [
    {
      courseCode: "ORGCHEM",
      student: "1000007",
      alphanum: "A1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000008",
      alphanum: "A2"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000009",
      alphanum: "B1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000010",
      alphanum: "C3"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000011",
      alphanum: "C1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000012",
      alphanum: "D2"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000013",
      alphanum: "A1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000014",
      alphanum: "D1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000016",
      alphanum: "E1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000017",
      alphanum: "C1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000018",
      alphanum: "C2"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000019",
      alphanum: "D2"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000020",
      alphanum: "B1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000021",
      alphanum: "C3"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000022",
      alphanum: "C1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000023",
      alphanum: "A1"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000024",
      alphanum: "B3"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000025",
      alphanum: "D3"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000026",
      alphanum: "C3"
    },
    {
      courseCode: "ORGCHEM",
      student: "1000027",
      alphanum: "D2"
    }
  ]
};
const pageTwo = {
  count: 40,
  next: null,
  previous: "http://127.0.0.1:8000/grades/",
  results: [
    {
      courseCode: "L45PROJ",
      student: "1000001",
      alphanum: "A4"
    },
    {
      courseCode: "L45PROJ",
      student: "1000002",
      alphanum: "A5"
    },
    {
      courseCode: "L45PROJ",
      student: "1000004",
      alphanum: "A4"
    },
    {
      courseCode: "L45PROJ",
      student: "1000009",
      alphanum: "B1"
    },
    {
      courseCode: "L45PROJ",
      student: "1000010",
      alphanum: "B1"
    },
    {
      courseCode: "L45PROJ",
      student: "1000011",
      alphanum: "C2"
    },
    {
      courseCode: "L45PROJ",
      student: "1000012",
      alphanum: "B3"
    },
    {
      courseCode: "L45PROJ",
      student: "1000013",
      alphanum: "A5"
    },
    {
      courseCode: "L45PROJ",
      student: "1000014",
      alphanum: "B3"
    },
    {
      courseCode: "L45PROJ",
      student: "1000015",
      alphanum: "B2"
    },
    {
      courseCode: "L45PROJ",
      student: "1000016",
      alphanum: "B1"
    },
    {
      courseCode: "L45PROJ",
      student: "1000017",
      alphanum: "B1"
    },
    {
      courseCode: "L45PROJ",
      student: "1000018",
      alphanum: "A5"
    },
    {
      courseCode: "L45PROJ",
      student: "1000019",
      alphanum: "B1"
    },
    {
      courseCode: "L45PROJ",
      student: "1000022",
      alphanum: "C2"
    },
    {
      courseCode: "L45PROJ",
      student: "1000023",
      alphanum: "C1"
    },
    {
      courseCode: "L45PROJ",
      student: "1000024",
      alphanum: "B1"
    },
    {
      courseCode: "L45PROJ",
      student: "1000025",
      alphanum: "A3"
    },
    {
      courseCode: "L45PROJ",
      student: "1000028",
      alphanum: "B2"
    },
    {
      courseCode: "L45PROJ",
      student: "1000029",
      alphanum: "A5"
    }
  ]
};

describe("Database Table Loads", () => {
  before(() => {
    cy.visit(VISIT_URL);
  });

  it("Has a Database Table", () => {
    cy.get(".databaseTable");
  });

  it("Displays the Empty Table Correctly", () => {
    cy.get(".MuiTableBody-root")
      .find("tr")
      .should("have.length", 2);
    cy.get(".MuiTableBody-root")
      .find("td")
      .should("contain", "No records to display");
  });
});

describe("Database Table Renders Data", () => {
  beforeEach(() => {
    cy.visit(VISIT_URL);
    cy.server();
  });

  it("Handles No Data", () => {
    cy.route({
      url: `${SERVER_URL}/grades/`,
      response: emptyData,
      method: "GET",
      status: 200
    }).as("getModuleData");

    cy.get(".getModuleDataButton").click();
    cy.wait(["@getModuleData"]);

    cy.get(".MuiTableBody-root")
      .find("tr")
      .should("have.length", 2);
    cy.get(".MuiTableBody-root")
      .find("td")
      .should("contain", "No records to display");
  });

  it("Handles One Request Worth of Data", () => {
    cy.route({
      url: `${SERVER_URL}/grades/`,
      response: smallData,
      method: "GET",
      status: 200
    }).as("getModuleData");

    cy.get(".getModuleDataButton").click();
    cy.wait(["@getModuleData"]);
    cy.get("span.MuiTypography-root").should("contain", "1-3 of 3");
  });

  it("Handles Multiple Requests Worth of Data", () => {
    cy.route({
      url: `${SERVER_URL}/grades/`,
      response: pageOne,
      method: "GET",
      status: 200
    }).as("getModuleData");
    cy.route({
      url: `${SERVER_URL}/grades/?page=2`,
      response: pageTwo,
      method: "GET",
      status: 200
    }).as("getModuleDataPage2");

    cy.get(".getModuleDataButton").click();
    cy.wait("@getModuleData");
    cy.wait("@getModuleDataPage2");
    cy.get("span.MuiTypography-root").should("contain", "1-10 of 40");
  });
});

describe("Database Table Pagination Works", () => {
  beforeEach(() => {
    cy.visit(VISIT_URL);
    cy.server();
    cy.route({
      url: `${SERVER_URL}/grades/`,
      response: pageOne,
      method: "GET",
      status: 200
    }).as("getModuleData");

    cy.route({
      url: `${SERVER_URL}/grades/?page=2`,
      response: pageTwo,
      method: "GET",
      status: 200
    }).as("getModuleDataPage2");
    cy.get(".getModuleDataButton").click();
    cy.wait("@getModuleData")
      .its("status")
      .should("eq", 200);
    cy.wait("@getModuleDataPage2")
      .its("status")
      .should("eq", 200);
    cy.wait("@getModuleDataPage2")
      .its("status")
      .should("eq", 200);
  });

  it("Can Move to Next/Previous Page", () => {
    cy.get("#root").find("span[title='Next Page']");
    cy.get("span[title='Next Page']").click();
    cy.get(".MuiTypography-root").should("contain", "11-20 of 40");
    cy.get("span[title='Previous Page']").click();
    cy.get(".MuiTypography-root").should("contain", "1-10 of 40");
  });

  it("Can Move to First/Last Page", () => {
    cy.get("#root").find("span[title='Next Page']");
    cy.get("span[title='Last Page']").click();
    cy.get("span.MuiTypography-root").should("contain", "31-40 of 40");
    cy.get("span[title='First Page']").click();
    cy.get("span.MuiTypography-root").should("contain", "1-10 of 40");
  });
});

describe("Database Table Filtering Works", () => {
  beforeEach(() => {
    cy.visit(VISIT_URL);
    cy.server();
    cy.route({
      url: `${SERVER_URL}/grades/`,
      response: pageOne,
      method: "GET",
      status: 200
    }).as("getModuleData");

    cy.route({
      url: `${SERVER_URL}/grades/?page=2`,
      response: pageTwo,
      method: "GET",
      status: 200
    }).as("getModuleDataPage2");
    cy.get(".getModuleDataButton").click();
    cy.wait("@getModuleData");
    cy.wait("@getModuleDataPage2");
    cy.wait("@getModuleDataPage2");
  });

  it("Has Correct Number of Discrete Options for Course Code and Grade", () => {
    cy.get(".MuiFormControl-root")
      .first()
      .click();
    cy.get("ul.MuiList-root")
      .children()
      .should("have.length", 2);

    cy.get("div#menu-.MuiPopover-root").click("topRight");
    cy.get(".MuiFormControl-root")
      .last()
      .click();
    cy.get("ul.MuiList-root")
      .children()
      .should("have.length", 15);
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
      .should("contain", "L45PROJ");
    for (var index = 0; index < 10; index++) {
      cy.get(`tr[index=${index}]`)
        .children()
        .first()
        .should("contain", "L45PROJ");
    }
    cy.get("span.MuiTypography-root").should("contain", "1-10 of 20");
  });

  it("Filters the Grade", () => {
    cy.get(".MuiFormControl-root")
      .last()
      .click();
    cy.get("ul.MuiList-root")
      .children()
      .first()
      .click();
    cy.get("div#menu-.MuiPopover-root").click();

    cy.get(".MuiFormControl-root")
      .last()
      .should("contain", "A1");
    for (var index = 0; index < 3; index++) {
      cy.get(`tr[index=${index}]`)
        .children()
        .last()
        .should("contain", "A1");
    }
    cy.get("span.MuiTypography-root").should("contain", "1-3 of 3");
  });

  it("Filters the Matric Number", () => {
    cy.get(".MuiInputBase-inputTypeSearch").type("1000009");
    cy.get(".MuiInputBase-inputTypeSearch").should("contain.value", "1000009");
    // Only to allow the table to rerender after the query filter
    cy.wait(50);
    for (var index = 0; index < 2; index++) {
      cy.get(`tr[index=${index}]`)
        .children()
        .first()
        .next()
        .should("contain.text", "1000009");
    }
  });
});
