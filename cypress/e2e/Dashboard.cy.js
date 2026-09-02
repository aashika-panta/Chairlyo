import { dashboardselector } from "../support/selector";

describe("Validate Super Admin Dashboard Functionality", () => {
  beforeEach(() => {
    cy.log(Cypress.config("baseUrl"));
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

  it("Verify super admin dashboard displayed after login", () => {
    cy.get("body").should("contain.text", "Branch");
  });

  it("Verify Logout from dashboard", () => {
    cy.get(".flex.items-center.rounded-xl.cursor-pointer").eq(10).click();
    cy.xpath(dashboardselector.logout).click();
    cy.get('button[data-variant="delete"]').click();
    cy.get("body").should("contain.text", "Welcome back");
  });

  it("Verify Add Branch opens from dashboard", () => {
    cy.xpath(dashboardselector.addBranch).click({ force: true });
    cy.get("body").should("contain.text", "Add Branches");
  });

  it("Verify sidebar navigation", () => {
    cy.xpath(dashboardselector.sidebarmenu).click();
    cy.xpath(dashboardselector.branchmenu).click();
    cy.get("body").should("contain.text", "Branches");
  });

  it("Verify dashboard by refreshing", () => {
    cy.wait(2000);
    cy.reload();
  });

  it("Verify dashboard UI elements", () => {
    cy.get("body").should("contain.text", "Add Branch");
  });
});
