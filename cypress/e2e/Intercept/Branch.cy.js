import { branchselector, search } from "../../support/selector";
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

  it("Verify branch creation with valid data", () => {

    cy.intercept("POST", "**/api/branch/branches/").as("createBranchAPI");

    cy.xpath(branchselector.addbranch).click({ force: true });
    cy.get("body").should("contain.text", "Add Branches");
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

    // Wait for API
    cy.wait("@createBranchAPI").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.request.body).to.have.property("name", branchName);
      expect(interception.request.body).to.have.property("slug", slug);
      cy.log(JSON.stringify(interception.request.body));
      cy.log(JSON.stringify(interception.response.body));
    });

   
    cy.contains(branchName).should("be.visible");
  });

  it("Verify branch edit functionality", () => {
    // Listen only to PATCH request
    cy.intercept("PATCH", "**/api/branch/branches/**").as("updateBranchAPI");

    // Search existing branch
    cy.xpath(search.searchclick).clear().type(branchName);

    cy.contains(branchName).should("be.visible");

    // Click edit
    cy.xpath(branchselector.editbranch).click({ force: true });

    cy.get("body").should("contain.text", "Save Changes");

    // Check current value before changing
    cy.get("#name")
      .should("be.visible")
      .invoke("val")
      .then((value) => {
        cy.log(`Current name: ${value}`);
      });

    // Change branch name
    cy.get("#name").clear().type(editedBranchName);

    // VERY IMPORTANT: verify input actually contains new value
    cy.get("#name").should("have.value", editedBranchName);

    cy.log(`New branch name: ${editedBranchName}`);

    // Save
    cy.xpath(branchselector.updatebranch).click({ force: true });

    // Wait for actual PATCH
    cy.wait("@updateBranchAPI").then((interception) => {
      cy.log(`METHOD: ${interception.request.method}`);
      cy.log(`URL: ${interception.request.url}`);

      cy.log(`REQUEST BODY: ${JSON.stringify(interception.request.body)}`);

      cy.log(`RESPONSE BODY: ${JSON.stringify(interception.response?.body)}`);

      // Verify API
      expect(interception.request.method).to.eq("PATCH");
      expect(interception.response.statusCode).to.eq(200);

      // Check what backend actually received
      expect(interception.request.body).to.have.property("name");

      cy.log(`API received name: ${interception.request.body.name}`);
    });
  });

  it("Verify branch delete functionality", () => {
    // Intercept DELETE API
    cy.intercept("DELETE", "**/api/branch/branches/**").as("deleteBranchAPI");

    // Search edited branch
    cy.xpath(search.searchclick).clear().type(editedBranchName);

    // Verify branch exists
    cy.contains("tr", editedBranchName).should("be.visible");

    // Find the correct row and click Delete
    cy.contains("tr", editedBranchName)
      .find('[title="Delete branch"]')
      .click({ force: true });

    // Confirmation input
    cy.xpath(branchselector.confirmdelete)
      .should("be.visible")
      .type("Delete Branch");

    // Click Delete button using text
    cy.contains("button", "Delete").should("be.visible").click({ force: true });

    // Wait for DELETE API
    cy.wait("@deleteBranchAPI").then((interception) => {
      cy.log(`METHOD: ${interception.request.method}`);
      cy.log(`URL: ${interception.request.url}`);
      cy.log(`STATUS: ${interception.response?.statusCode}`);

      expect(interception.request.method).to.eq("DELETE");

      expect(interception.response.statusCode).to.be.oneOf([200, 204]);
    });
    cy.xpath(search.searchclick)
      .clear({ force: true })
      .type(editedBranchName, { force: true });

    cy.contains("Sorry").should("be.visible");
  });
});
