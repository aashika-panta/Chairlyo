import { branchselector, search, loginselector } from "../../support/selector";
import { faker } from "@faker-js/faker";

describe("Branch CRUD functionality", () => {
  // Reuse login session
  beforeEach(() => {
    cy.session("branch-admin", () => {
      cy.visit("/");
      cy.get(loginselector.email)
        .should("be.visible")
        .type(Cypress.env("USERNAME"));

      cy.get(loginselector.password)
        .should("be.visible")
        .clear()
        .type(Cypress.env("PASSWORD"));

      cy.xpath(loginselector.login).should("be.visible").click();

      cy.url().should("not.include", "login");
    });

    cy.visit("/");
  }); 
  const branchName = faker.company.name();
  const editedBranchName = `Edited-${faker.string.numeric(5)}`;
  const slug = `beauty-salon-${faker.string.numeric(3)}`;

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const branchEmail = faker.internet.email();
  const adminEmail = faker.internet.email();

  const phone = "984" + faker.string.numeric(7);

  const password = "Branch@123";

  it("Verify navigation to Add Branch", () => {
    cy.xpath(branchselector.addbranch)
      .should("be.visible")
      .click({ force: true });

    cy.get("body").should("contain.text", "Add Branches");
  });

  it("Verify branch creation with valid data", () => {
    cy.xpath(branchselector.addbranch)
      .should("be.visible")
      .click({ force: true });

    // Branch information
    cy.get(branchselector.Branchname).type(branchName);

    cy.get(branchselector.Slug).type(slug);

    // Branch phone
    cy.get(branchselector.BranchPhone).eq(0).clear().type("+977");

    cy.get(branchselector.BranchPhone).eq(0).type(phone);

    // Branch email
    cy.get(branchselector.BranchEmail).type(branchEmail);

    // Status
    cy.xpath(branchselector.Status).click();

    cy.get('button[role="combobox"]')
      .filter(':has(span[data-slot="select-value"])')
      .then(($btn) => {
        if ($btn.attr("aria-expanded") === "false") {
          cy.wrap($btn).click();
        }
      });

    cy.get('[role="option"]')
      .contains(/^Active$/)
      .click({ force: true });

    // Address
    cy.get(branchselector.Address).type("Kathmandu, Nepal");

    // Branch admin information
    cy.get(branchselector.Firstname).type(firstName);

    cy.get(branchselector.Lastname).type(lastName);

    cy.get(branchselector.AdminEmail).type(adminEmail);

    cy.get(branchselector.Password).type(password);

    // Admin phone
    cy.get(branchselector.AdminPhone).eq(1).clear().type("+977");

    cy.get(branchselector.AdminPhone).eq(1).type(phone);

    // Create branch
    cy.xpath(branchselector.createbranch).click();

    // Verify branch created
    cy.contains(branchName).should("be.visible");
  });

  it("Verify branch edit functionality", () => {
    cy.log(`Original branch: ${branchName}`);
    cy.log(`Edited branch: ${editedBranchName}`);

    // Search branch
    cy.xpath(search.searchclick).clear().type(branchName);

    // Verify actual table row exists
    cy.xpath(`//tbody/tr[contains(., "${branchName}")]`).should("be.visible");

    // Click edit
    cy.xpath(`//tbody/tr[contains(., "${branchName}")]//a[2]`).click({
      force: true,
    });

    // Verify edit page
    cy.contains("Save Changes").should("be.visible");

    // Change branch name
    cy.get(branchselector.Branchname).clear().type(editedBranchName);

    // Save changes
    cy.xpath(branchselector.updatebranch).click({ force: true });

    // Verify success message
    cy.contains("Branch Updated").should("be.visible");

    cy.contains("The branch has been updated successfully.").should(
      "be.visible",
    );

    // Verify updated branch in table
    cy.xpath(`//tbody/tr[contains(., "${editedBranchName}")]`).should(
      "be.visible",
    );
  });

  it("Verify branch delete functionality", () => {
    // Search edited branch
    cy.xpath(search.searchclick).clear().type(editedBranchName);

    // Verify the actual branch row exists
    cy.xpath(`//tbody/tr[contains(., "${editedBranchName}")]`);

    // Click delete
    cy.xpath(
      `//tbody/tr[contains(., "${editedBranchName}")]//div[@title="Delete branch"]`,
    ).click({ force: true });

    // Type confirmation text
    cy.xpath(branchselector.confirmdelete).type("Delete Branch");

    cy.contains("button", "Delete Branch").click({ force: true });

    // Verify success message
    cy.contains("Deleted").should("be.visible");

    // Clear search
    cy.xpath(search.searchclick).clear();

    // Verify branch is deleted
    cy.xpath(`//tbody/tr[contains(., "${editedBranchName}")]`).should(
      "not.exist",
    );
  });
});
