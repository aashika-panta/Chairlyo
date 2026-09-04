import { branchselector, search } from "../support/selector";
import { faker } from "@faker-js/faker";

describe("Branch Add functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  const branchName = faker.company.name();
  const editedBranchName = `Edited-${faker.string.numeric(5)}`;
  const slug = `beauty-salon-${faker.string.numeric(3)}`;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const branchEmail = faker.internet.email();
  const adminEmail = faker.internet.email();

  const phone = "98" + faker.string.numeric(8);

  const password = "Branch@123";

  it("Verify navigation to Add Branch", () => {
    cy.xpath(branchselector.addbranch).click({ force: true });
    cy.get("body").should("contain.text", "Add Branches");
  });

  it("Verify branch creation with valid data", () => {
    cy.xpath(branchselector.addbranch).click({ force: true });
    cy.get(branchselector.Branchname).type(branchName);
    cy.get(branchselector.Slug).type(slug);

    cy.get(branchselector.BranchPhone).eq(0).clear().type("+977");
    cy.get(branchselector.BranchPhone).eq(0).type(phone);

    cy.get(branchselector.BranchEmail).type(branchEmail);

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

    cy.get(branchselector.Address).type("Kathmandu, Nepal");

    cy.get(branchselector.Firstname).type(firstName);
    cy.get(branchselector.Lastname).type(lastName);
    cy.get(branchselector.AdminEmail).type(adminEmail);
    cy.get(branchselector.Password).type(password);

    cy.get(branchselector.AdminPhone).eq(1).clear().type("+977");
    cy.get(branchselector.AdminPhone).eq(1).type(phone);

    cy.xpath(branchselector.createbranch).click();

    cy.get("body").should("contain.text", branchName);
  });

  it("Verify branch edit functionality", () => {
    cy.log(branchName);
    cy.log(editedBranchName);

    cy.wait(1000);

    cy.xpath(search.searchclick).clear().type(branchName);

    cy.get("body").should("contain.text", branchName);

    cy.xpath(branchselector.editbranch).click({ force: true });

    cy.get("body").should("contain.text", "Save Changes");

    cy.wait(2000);

    cy.get(branchselector.Branchname).clear().type(editedBranchName);

    cy.xpath(branchselector.updatebranch).click({ force: true });

    cy.wait(2000);

    cy.get("body").should("contain.text", editedBranchName);
  });

  it("Verify branch delete functionality", () => {
    cy.xpath(search.searchclick).clear().type(editedBranchName);

    cy.contains(editedBranchName).should("be.visible");

    cy.xpath(
      `//tbody/tr[contains(., "${editedBranchName}")]//div[@title="Delete branch"]`,
    )
      .should("exist")
      .click({ force: true });

    cy.xpath(branchselector.confirmdelete)
      .should("be.visible")
      .type("Delete Branch");

    cy.xpath(branchselector.delete).should("be.visible").click({ force: true });
    cy.xpath(search.searchclick).clear();
    cy.contains("Deleted").should("be.visible");
  });
});
