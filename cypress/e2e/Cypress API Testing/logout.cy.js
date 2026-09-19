const loginUrl =
  "https://qa02.base.chairlyo.com/api/accounts/login/";

const logoutUrl =
  "https://qa02.base.chairlyo.com/api/accounts/logout/";

describe("Chairlyo Logout API", () => {
  let accessToken;
  let refreshToken;

  before(() => {
    cy.env(["USERNAME", "PASSWORD"]).then((env) => {
      cy.request({
        method: "POST",
        url: loginUrl,
        body: {
          email: env.BRANCH_ADMIN_EMAIL,
          password: env.BRANCH_ADMIN_PASSWORD,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);

        cy.log("LOGIN RESPONSE: " + JSON.stringify(response.body));

        accessToken = response.body.access;
        refreshToken = response.body.refresh;

        cy.log("Access Token exists: " + !!accessToken);
        cy.log("Refresh Token exists: " + !!refreshToken);
      });
    });
  });

  it("should logout successfully", () => {
    cy.request({
      method: "POST",
      url: logoutUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: {
        refresh: refreshToken
      },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log("Logout Status: " + response.status);
      cy.log("Logout Response: " + JSON.stringify(response.body));

      expect(response.status).to.eq(200);
    });
  });
});