import { customer } from "../support/selector";
import { faker } from "@faker-js/faker";

describe("Customer CRUD Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();
    cy.xpath(customer.management).click();
  });

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = "+97798" + faker.string.numeric(8);
  const email = faker.internet.email();

  it("Verify Customer can be added with Valid details", () => {
    cy.xpath(customer.customerpage).click();
    cy.xpath(customer.addcustomer).eq(0).should("be.visible").click();
    cy.get(customer.firstname).type(firstName);
    cy.get(customer.lastname).type(lastName);
    cy.get(customer.phone).clear().type(phone);
    cy.get(customer.email).type(email);

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

    cy.get(customer.address).type("Kathmandu");
    cy.get(customer.note).type("Customer created using Faker");

    cy.xpath(customer.createcustomer).click();

    cy.get("body").should("contain.text", firstName);
    cy.get("body").should("contain.text", lastName);
  });

  it("Verify customer edit functionality", () => {
    cy.xpath(customer.customerpage).click();

    cy.xpath(customer.searchcustomer).clear().type(firstName);

    cy.get("body").should("contain.text", firstName);

    cy.xpath(customer.editcustomer).click({ force: true });

    cy.get(customer.firstname).clear().type("arpita");

    cy.xpath(customer.save).click({ force: true });

    cy.get("body").should("contain.text", "arpita");
  });

  it("Verify Customer can be deleted", () => {
    cy.xpath(customer.customerpage).click();

    cy.xpath(customer.searchcustomer).clear().type("arpita");

    cy.contains("arpita panta").should("be.visible");

    cy.xpath(customer.deletecustomer)
      .should("be.visible")
      .click({ force: true });

    cy.xpath(customer.typedelete).should("be.visible").type("Delete");
    cy.xpath(customer.confirmDelete)
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.wait(2000);
    cy.xpath(customer.searchcustomer).clear().type("arpita");
    cy.contains("arpita panta").should("not.exist");
  });
});
