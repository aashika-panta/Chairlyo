const loginUrl = "https://qa02.base.chairlyo.com/api/accounts/login/";

describe("Chairlyo Login API", () => {

  it("should login with valid credentials", () => {
    cy.env(["USERNAME", "PASSWORD"]).then((env) => {

      cy.log("Username exists: " + !!env.USERNAME);
      cy.log("Password exists: " + !!env.PASSWORD);

      cy.request({
        method: "POST",
        url: loginUrl,
        failOnStatusCode: false,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: env.USERNAME,
          password: env.PASSWORD,
        },
      }).then((response) => {

        cy.log("Status: " + response.status);
        cy.log("Body: " + JSON.stringify(response.body));

        expect(response.status).to.eq(200);
        expect(response.body).to.exist;
      });
    });
  });

  it("should reject empty password", () => {
    cy.env(["USERNAME"]).then((env) => {

      cy.request({
        method: "POST",
        url: loginUrl,
        failOnStatusCode: false,
        body: {
          email: env.USERNAME,
          password: "",
        },
      }).then((response) => {

        expect(response.status).to.not.eq(200);
      });
    });
  });


  it("should reject empty email and password", () => {

    cy.request({
      method: "POST",
      url: loginUrl,
      failOnStatusCode: false,
      body: {
        email: "",
        password: "",
      },
    }).then((response) => {

      expect(response.status).to.not.eq(200);
    });
  });


  it("should reject request without email", () => {
    cy.env(["PASSWORD"]).then((env) => {

      cy.request({
        method: "POST",
        url: loginUrl,
        failOnStatusCode: false,
        body: {
          password: env.PASSWORD,
        },
      }).then((response) => {

        expect(response.status).to.not.eq(200);
      });
    });
  });


  it("should reject request without password", () => {
    cy.env(["USERNAME"]).then((env) => {

      cy.request({
        method: "POST",
        url: loginUrl,
        failOnStatusCode: false,
        body: {
          email: env.USERNAME,
        },
      }).then((response) => {

        expect(response.status).to.not.eq(200);
      });
    });
  });

});