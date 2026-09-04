import { customer } from "../support/selector";

describe("Customer CRUD Functionality", () => {
  beforeEach(() => {
    
    cy.visit("/");
    cy.branchAdminLogin();
    cy.xpath(customer.management).click();
  });
  it("Verify Customer can be added with Valid details", () => {
    cy.xpath(customer.customerpage).click();
    cy.xpath(customer.addcustomer).eq(0).should("be.visible").click();
    cy.get(customer.firstname).type("aashka");
    cy.get(customer.lastname).type("panta");
    cy.get(customer.phone).clear().type("+977 9879543210");
    cy.get(customer.email).type("aadaa@gmail.com");

    cy.contains('button[role="combobox"]', "Select Gender")
      .should("be.visible")
      .click();
    cy.get('[role="option"]').contains("Female").click();

    cy.get(customer.dob).should("be.visible").click();
    cy.get('button[aria-label="Choose the Nepali month"]')
      .should("be.visible")
      .click();
    cy.contains('[role="option"]', "Bhadra").should("be.visible").click();
    cy.get('button[aria-label="Choose the Nepali year"]')
      .should("be.visible")
      .click();
    cy.contains('[role="option"]', "2079").should("be.visible").click();
    cy.contains("button", /^22$/).should("be.visible").click();

    cy.get(customer.address).type("kathmandu");
    cy.get(customer.note).type("helllo");

    cy.xpath(customer.createcustomer).click();
  });

  it("Verify customer edit Functionelity", () => {
    cy.xpath(customer.customerpage).click();
    cy.xpath(customer.searchcustomer).type("alisa").click();
    cy.xpath(customer.editcustomer).click();
    cy.get(customer.firstname).clear().type("arpita");
    cy.xpath(customer.save).click();
  });

  it("Verify Customer can be deleted", () => {
    cy.xpath(customer.customerpage).click();
    cy.xpath(customer.searchcustomer).type("aaska panta");
    cy.wait(2000);
    cy.xpath(customer.deletecustomer).click();
    cy.xpath(customer.typedelete).type("Delete");
    cy.wait(2000);
    cy.xpath(customer.confirmDelete)
      .should("exist")
      .should("be.visible")
      .should("not.be.disabled")
      .click();
      cy.wait(3000);
  });
});
