import { loginToApp } from "./data-home.spec";

const csvFileData = {
  fileContent: "CMCCHEM,\n1000013,A5,\n1000014,B1,\n1000015,B1,",
  fileName: "Grade roster CHEM_4003_2019.csv",
  mimeType: "text/csv"
};
const nonCsvFileData = {
  fileContent: "This is a text file.",
  fileName: "text_file.txt",
  mimeType: "text"
};
const csvFileDataWithInvalidFileName = {
  fileContent: "CMCCHEM,\n1000013,A5,\n1000014,B1,\n1000015,B1,",
  fileName: "Grade roster CHEM_4003.csv",
  mimeType: "text/csv"
};

describe("StudentModuleMarkDropZone", () => {
  beforeEach(() => {
    loginToApp();
    cy.get(".marksUploadLink").click();
  });

  it("accepts a csv file and deletes a csv file", () => {
    cy.get("[data-cy=drop-zone-input]")
      .upload(csvFileData)
      .get(".added-file")
      .contains(csvFileData.fileName);
    cy.get("[data-cy=alert-message]").contains(
      csvFileData.fileName + " is ready to be uploaded"
    );

    cy.get(".delete-file-icon").click();
    cy.get("[data-cy=alert-message]").contains(
      csvFileData.fileName + " will not be uploaded"
    );
  });

  it("refuses to accept a non-csv file", () => {
    cy.get("[data-cy=drop-zone-input]")
      .upload(nonCsvFileData)
      .get(".added-file")
      .should("not.exist");
    cy.get("[data-cy=alert-message]").contains(
      nonCsvFileData.fileName + " is of invalid format"
    );
  });

  it("doesn't let you upload if there's a file with invalid filename format ready to be uploaded", () => {
    cy.get("[data-cy=drop-zone-input]").upload(csvFileDataWithInvalidFileName);
    cy.get("[data-cy=upload-csv-files]").click();

    const stub = cy.stub();
    cy.on("window:alert", stub).then(() => {
      expect(stub.getCall(0)).to.be.calledWith(
        "Error attempting to upload file with invalid file name. Received filename: " +
          csvFileDataWithInvalidFileName.fileName
      );
    });
  });

  it("doesn't let you upload 0 files", () => {
    cy.get("[data-cy=upload-csv-files]").click();
    cy.get("[data-cy=alert-message]").contains("No files to upload");
  });

  it("doesn't upload to server when it cannot connect to server", () => {
    cy.get("[data-cy=drop-zone-input]").upload(csvFileData);
    cy.get(".added-file").contains(csvFileData.fileName);
  });
});
