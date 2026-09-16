describe("Admin Dashboard functionality ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.branchAdminLogin();
  });
  it("Verify Admin dashboard is displayed", () => {
    cy.get("body").should("contain.text", "Dashboard");
    cy.get("body").should("contain.text", "Aashika");
    cy.get("body").should("contain.text", "Sessions");
    cy.get("body").should("contain.text", "Calendar");
  });
});
