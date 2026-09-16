import { staff } from "../support/selector";
import { faker } from "@faker-js/faker";

describe("Staff CRUD Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();

    cy.xpath(staff.management).click();
  });

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = "+977 98" + faker.string.numeric(8);
  const email = faker.internet.email();

  const editedFirstName = "Sita";
  const editedLastName = "Silwal";

  it("Verify staff can be added with valid details", () => {
    cy.xpath(staff.staffpage).click();
    cy.xpath(staff.addstaff).eq(0).click({ force: true });

    cy.get(staff.firstname).type(firstName);
    cy.get(staff.lastname).type(lastName);
    cy.get(staff.phone).clear().type(phone);
    cy.get(staff.email).type(email);

    cy.xpath(staff.staffrole).should("be.visible").click();

    cy.get('input[placeholder="Search"]')
      .filter(":visible")
      .first()
      .clear()
      .type("Hair Cutting");

    cy.get('button[role="checkbox"]')
      .filter(':contains("Hair Cutting")')
      .first()
      .should("be.visible")
      .click();

    cy.get('button[role="checkbox"]')
      .filter(':contains("Hair Cutting")')
      .first()
      .should("have.attr", "aria-checked", "true");

    cy.get(staff.joineddate).click();

    cy.get('button[aria-label="Choose the Nepali month"]').click();

    cy.contains('[role="option"]', "Bhadra").click();

    cy.get('button[aria-label="Choose the Nepali year"]').click();

    cy.contains('[role="option"]', "2079").should("be.visible").click();

    cy.contains("button", /^22$/).click();

    cy.xpath(staff.roleDropdown).should("be.visible").click();

    cy.contains('[role="option"]', "Receptionist").should("be.visible").click();

    cy.xpath(staff.createstaff).click();

    cy.xpath(staff.addStaffOnly).click();
    cy.get("body").should("contain.text", "Staff Added");
  });

  it("Verify staff edit functionality", () => {
    cy.xpath(staff.staffpage).click();
    cy.xpath(staff.searchstaff).type(firstName);
    cy.contains(firstName).should("be.visible");
    cy.xpath(staff.editstaff).click({ force: true });
    cy.get(staff.firstname).clear().type(editedFirstName);
    cy.get(staff.lastname).clear().type(editedLastName);
    cy.xpath(staff.save).click({ force: true });
    cy.contains(`${editedFirstName} ${editedLastName}`).should("exist");
  });

  it("Verify edited staff can be deleted", () => {
    cy.xpath(staff.staffpage).click();
    cy.xpath(staff.searchstaff).type(editedFirstName);
    cy.wait(1000); // Wait for search results to load
    cy.contains(`${editedFirstName} ${editedLastName}`).should("be.visible");
    cy.xpath(staff.deleteicon).click({ force: true });
    cy.xpath(staff.deletetype).type("Delete");
    cy.get('button[data-variant="delete"]').should("be.visible").click();
    cy.xpath(staff.searchstaff).clear();
    cy.contains(`${editedFirstName} ${editedLastName}`).should("not.exist");
  });
});
