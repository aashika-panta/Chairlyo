import { service } from "../support/selector";

describe("Service CRUD Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();
    cy.xpath(service.catalog).click();
  });
  it("Verify service can be added with Valid details", () => {
    cy.xpath(service.servicepage).should("be.visible").click();
    cy.xpath(service.addservice).should("be.visible").click();
    cy.get(service.servicename).should("be.visible").type("Hair Cutting");

    cy.contains('button[role="combobox"]', "Select Category").should("be.visible").click();
    cy.xpath(service.search).should("be.visible").type("hair care");
    cy.get("[cmdk-list]").contains(/hair care/i).should("be.visible").click();
    cy.get(service.price).should("be.visible").clear().type("1000");
    cy.get(service.duration).should("be.visible").clear().type("60");

    cy.get(service.commissiontypedropdown).filter(':contains("Select Commission Type")').should("be.visible").click();

    cy.get('[role="option"]').contains("Percentage").click();
    cy.xpath(service.value).should("be.visible").type("10");
    cy.get(service.description).should("be.visible").type("Professional hair cutting service");

    cy.xpath(service.createservice).click({ force: true });
    cy.contains("Hair Cutting").should("be.visible");
  });
});
