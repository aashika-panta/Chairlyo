import { branchselector, search } from "../support/selector";
import { faker } from "@faker-js/faker";

describe("Branch Add functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  const branchName = faker.company.name();
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
    cy.wait(3000);
    cy.xpath(search.searchclick).type(branchName);
    cy.get("body").should("contain.text", branchName);
    cy.xpath(branchselector.editbranch).click({ force: true });
    cy.get("body").should("contain.text", "Save Changes");
    cy.wait(5000);
    cy.get(branchselector.Branchname).clear().type("hedoho");
    cy.xpath(branchselector.updatebranch).click({ force: true });
    cy.wait(3000);
    cy.get("body").should("contain.text", "Branch");
  });

  it("Verify branch delete functionality", () => {
    cy.xpath(search.searchclick).type("Morar - Crooks");
    cy.get("body").should("contain.text", "Morar - Crooks");
    cy.xpath(branchselector.deletebranch).click({ force: true });
    cy.xpath(branchselector.confirmdelete).type("Delete Branch");
    cy.xpath(branchselector.delete).click();
    cy.xpath(search.searchclick).clear();
    cy.get("body").should("not.contain.text", "Morar - Crooks");
  });
});
