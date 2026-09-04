import { waiting } from "../support/selector";

describe("Waiting Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();
  });

  it("Verify waiting can be added with valid details", () => {
    cy.xpath(waiting.waiting).click();

    cy.xpath(waiting.addWaiting).click({ force: true, multiple: true });

    cy.get(waiting.searchCustomer).type("anupa panta");

    cy.contains("anupa panta").click({ force: true });

    cy.xpath(waiting.nextButton)
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.xpath(waiting.addService).click({ force: true });

    cy.xpath(waiting.serviceSearch).type("Hair Cutting", { force: true });

    cy.contains("Hair Cutting").click({ force: true });

    cy.xpath(waiting.searchdone).click({ force: true });
    cy.xpath(waiting.assignstaff).click({ force: true });

    cy.xpath(waiting.typestaff)
      .first()
      .clear({ force: true })
      .type("puja", { force: true });

    cy.xpath(waiting.selectstaff)
      .scrollIntoView({ duration: 500 })
      .click({ force: true });

    cy.xpath(waiting.addToWaiting).click({ force: true });
    cy.get("body").should("contain.text", "Added to waiting");

    cy.xpath(waiting.sessionstart).click({ force: true });

    cy.xpath(waiting.completesession).click({ force: true });

    cy.xpath(waiting.submit).click({ force: true });

    cy.get("body").should("contain.text", "Session Completed");
  });
});
