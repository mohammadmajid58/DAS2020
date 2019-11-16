// Url of component on web app
const visitUrl = "http://localhost:3000/";

const csvFileData = {
  fileContent: "CMCCHEM,\n1000013,A5,\n1000014,B1,\n1000015,B1,",
  fileName: "test.csv",
  mimeType: "text/csv"
};
const nonCsvFileData = {
  fileContent: "This is a text file.",
  fileName: "text_file.txt",
  mimeType: "text"
};

// Expected response status
const responseStatus = {
  created: 201
};
const responseTimeoutLimit = 5000;

describe("CSVDropZone", () => {
  it("accepts a csv file and sends a post request", () => {
    const server = cy.server();
    cy.route("POST", "/grades/").as("route1");

    cy.visit(visitUrl);
    cy.get("[data-cy=drop-zone-input]").upload(csvFileData);

    cy.wait(["@route1"], { responseTimeout: responseTimeoutLimit }).then(
      response => {
        expect(response.status).to.eq(responseStatus.created);
      }
    );
  });

  it("refuses to accept a non-csv file with an alert", () => {
    cy.visit(visitUrl);

    let stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get("[data-cy=drop-zone-input]")
      .upload(nonCsvFileData)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Expected a CSV file");
      });
  });
});
