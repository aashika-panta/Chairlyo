import { loginselector } from "../support/selector";

describe("validate login Functionallity", () => {
  beforeEach(() => {
    cy.visit("https://qa02.stage.chairlyo.com/login");
  });

  afterEach(() => {
    cy.log("Test execution  completed ");
  });
  
  it("Verify login with valid credential", () => {
    cy.get(loginselector.email).type("skilladmin@test.com");
    cy.get(loginselector.password).type("Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Login successful");
  });

  it("Verify login with invalid credential", () => {
    cy.get(loginselector.email).type("skiltest@test.com");
    cy.get(loginselector.password).type("Skil@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Welcome back");
  });

  it("Verify login with empty email", () => {
    cy.get(loginselector.email);
    cy.get(loginselector.password).type("Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Welcome back");
  });

  it("Verify login with empty password", () => {
    cy.get(loginselector.email).type("skilladmin@test.com");
    cy.get(loginselector.password);
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Welcome back");
  });

  it("Verify login with empty email and password", () => {
    cy.get(loginselector.email);
    cy.get(loginselector.password);
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Welcome back");
  });

  it("Verify login with uppercase email address", () => {
    cy.get(loginselector.email).type("SKILLADMIN@TEST.COM");
    cy.get(loginselector.password).type("Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Login successful");
  });

  it("Verify password case sensitivity", () => {
    cy.get(loginselector.email).type("skilladmin@test.com");
    cy.get(loginselector.password).type("SKILL@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("not.contain.text", "Login successful");
  });

  it("Verify login with leading spaces in email and password", () => {
    cy.get(loginselector.email).type("   skilladmin@test.com");
    cy.get(loginselector.password).type("   Skill@123");
    cy.xpath(loginselector.login).click();
    cy.get("body").should("contain.text", "Login successful");
  });
});
