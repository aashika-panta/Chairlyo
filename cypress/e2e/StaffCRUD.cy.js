import { staff } from "../support/selector";

describe("Staff CRUD Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();

    cy.xpath(staff.management).click();
  });

  it("Verify staff can be added with valid details", () => {
    cy.xpath(staff.staffpage).click();
    cy.xpath(staff.addstaff).eq(0).click({ force: true });

    cy.get(staff.firstname).type("Aashika");
    cy.get(staff.lastname).type("Panta");
    cy.get(staff.phone).clear().type("+977 9090906543");
    cy.get(staff.email).type("abdfdjsshcd@example.com");

    cy.xpath(staff.staffrole).should("be.visible").click();
    cy.get('input[placeholder="Search"]').filter(":visible").first().clear().type("Hair Cutting");
    cy.get('button[role="checkbox"]').filter(':contains("Hair Cutting")').first().should("be.visible").click();
    cy.get('button[role="checkbox"]').filter(':contains("Hair Cutting")').first().should("have.attr", "aria-checked", "true");

    cy.get(staff.joineddate).click();
    cy.get('button[aria-label="Choose the Nepali month"]').click();
    cy.contains('[role="option"]', "Bhadra").click();
    cy.get('button[aria-label="Choose the Nepali year"]').click();
    cy.contains('[role="option"]', "2079").should("be.visible").click();
    cy.contains("button", /^22$/).click();
 
    cy.xpath(staff.roleDropdown).should("be.visible").click();
    cy.contains('[role="option"]', "Receptionist").should("be.visible").click();

    cy.xpath(staff.createstaff).should("be.visible").click();

    cy.contains("Add staff only").click();
    cy.get("body").should("contain.text","Staff Added");
  });

});
