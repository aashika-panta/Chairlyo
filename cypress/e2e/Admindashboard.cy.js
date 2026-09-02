describe("Admin Dashboard functionality ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();
  });
  it("Verify Admin dashboard is displayed", () => {
    cy.get("body").should("contain.text", "Dashboard");
    cy.get("body").should("contain.text", "Revenue");
    cy.get("body").should("contain.text", "Customers");
    cy.get("body").should("contain.text", "Staff");
  });
});
