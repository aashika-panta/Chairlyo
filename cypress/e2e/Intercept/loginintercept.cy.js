const loginUrl =
  "https://qa02.base.chairlyo.com/api/accounts/login/";

describe("Chairlyo Login with cy.intercept()", () => {

  it("should intercept login API", () => {

    cy.intercept("POST", loginUrl).as("login");

    cy.visit("https://qa02.stage.chairlyo.com");

    cy.env(["USERNAME", "PASSWORD"]).then((env) => {

      cy.get('[name="email"]')
        .type(env.USERNAME);

      cy.get('[name="password"]')
        .type(env.PASSWORD);

      cy.xpath("//button[@type='submit']").click();

      cy.wait("@login").then((interception) => {

        cy.log(
          "Request URL: " + interception.request.url
        );

        cy.log(
          "Request Method: " + interception.request.method
        );

        cy.log(
          "Response Status: " + interception.response.statusCode
        );

      });

    });

  });

});