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

  const editedFirstName = "sita";
  const editedLastName = "silwal";

  it("Verify Customer can be added with Valid details", () => {
    cy.xpath(customer.customerpage).click();
    cy.xpath(customer.addcustomer).eq(0).click();

    cy.get(customer.firstname).type(firstName);
    cy.get(customer.lastname).type(lastName);
    cy.get(customer.phone).clear().type(phone);
    cy.get(customer.email).type(email);

    cy.contains('button[role="combobox"]', "Select Gender").click();

    cy.get('[role="option"]').contains("Female").click();

    cy.get(customer.dob).click();

    cy.get('button[aria-label="Choose the Nepali month"]').click();

    cy.contains('[role="option"]', "Bhadra").click();

    cy.get('button[aria-label="Choose the Nepali year"]').click();

    cy.contains('[role="option"]', "2079").click();

    cy.contains("button", /^22$/).click();

    cy.get(customer.address).type("Kathmandu");
    cy.get(customer.note).type("Customer created using Faker");

    cy.xpath(customer.createcustomer).click();

    cy.get("body").should("contain.text", firstName);
  });

  it("Verify customer edit functionality", () => {
    cy.xpath(customer.customerpage).click();

    cy.xpath(customer.searchcustomer).clear().type(firstName);

    cy.contains(firstName).should("be.visible");

    cy.xpath(customer.editcustomer).click({ force: true });

    cy.get(customer.firstname).clear().type(editedFirstName);

    cy.get(customer.lastname).clear().type(editedLastName);

    cy.xpath(customer.save).click({ force: true });

    cy.contains("sita silwal").should("be.visible");
  });

  it("Verify customer can be deleted", () => {
    cy.xpath(customer.customerpage).click();

    cy.xpath(customer.searchcustomer).clear().type("sita");

    cy.contains("sita silwal").should("be.visible");

    cy.xpath(customer.deletecustomer).click({ force: true });

    cy.xpath(customer.typedelete).should("be.visible").type("Delete");

    cy.xpath(customer.confirmDelete)
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    cy.wait(2000);

    cy.xpath(customer.searchcustomer).clear().type("sita");

    cy.contains("sita silwal").should("not.exist");
  });
});
