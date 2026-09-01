import { search } from "../support/selector";

describe("serach functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });
  afterEach(function () {
    if (this.currentTest.state === "failed") {
      cy.log("failed " + this.currentTest.title);
    } else {
      cy.log("passed " + this.currentTest.title);
    }
  });

  it(" Verify branch can be searched by valid name", () => {
    cy.xpath(search.searchclick).type("Beauty Bliss");
    cy.get("body").should("contain.text","Beauty Bliss");
  });

  it(" Verify branch can be searched with partial name", () => {
    cy.xpath(search.searchclick).type("Beauty");
    cy.get("body").should("contain.text","Beauty Bliss");
  });

  it(" Verify search with non-existing branch name", () => {
    cy.xpath(search.searchclick).type("hsdghdfwgd");
    cy.get("body").should("contain.text","Sorry");
  });

  it("Verify search with numbers", () => {
    cy.xpath(search.searchclick).type("123");
    cy.get("body").should("contain.text","123");
  });

  it(" Verify search with special characters", () => {
    cy.xpath(search.searchclick).type("@#&");
    cy.get("body").should("contain.text","Sorry");
  });

  it(" Verify search is case-insensitive", () => {
    cy.xpath(search.searchclick).type("BEAUTY BLISS");
    cy.get("body").should("contain.text","Beauty Bliss");
  });
});
