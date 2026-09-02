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
    cy.get(customer.firstname).type("aashikaa");
    cy.get(customer.lastname).type("panta");
    cy.get(customer.phone).clear().type("+977 9876543210");
    cy.get(customer.email).type("aaaa@gmail.com");

    cy.contains('button[role="combobox"]', "Select Gender").should("be.visible").click();
    cy.get('[role="option"]').contains("Female").click();

    cy.get(customer.dob).should("be.visible").click();
    cy.get('button[aria-label="Choose the Nepali month"]').should("be.visible").click();
    cy.contains('[role="option"]', "Bhadra").should("be.visible").click();
    cy.get('button[aria-label="Choose the Nepali year"]').should("be.visible").click();
    cy.contains('[role="option"]', "2079").should("be.visible").click();
    cy.contains("button", /^22$/).should("be.visible").click();

    cy.get(customer.address).type("kathmandu");
    cy.get(customer.note).type("helllo");

    cy.xpath(customer.createcustomer).click();
  });
});
