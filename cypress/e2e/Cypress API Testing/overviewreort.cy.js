const loginUrl =
  "https://qa02.base.chairlyo.com/api/accounts/login/";

const reportUrl =
  "https://qa02.base.chairlyo.com/api/org-reports/overview-report/";

describe("Chairlyo Overview Report API - Negative Tests", () => {
  let accessToken;

  before(() => {
    cy.env(["USERNAME", "PASSWORD"]).then((env) => {
      cy.request({
        method: "POST",
        url: loginUrl,
        body: {
          email: env.USERNAME,
          password: env.PASSWORD,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);

        accessToken = response.body.access;

        expect(accessToken).to.exist;
      });
    });
  });

  it("should reject request without authentication", () => {
    cy.request({
      method: "GET",
      url: reportUrl,
      qs: {
        period: "custom",
        date_from: "2026-04-14",
        date_to: "2027-04-13",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });

  it("should reject invalid authentication token", () => {
    cy.request({
      method: "GET",
      url: reportUrl,
      headers: {
        Authorization: "Bearer invalid-token",
      },
      qs: {
        period: "custom",
        date_from: "2026-04-14",
        date_to: "2027-04-13",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });

  it("should reject invalid period", () => {
    cy.request({
      method: "GET",
      url: reportUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      qs: {
        period: "invalid",
        date_from: "2026-04-14",
        date_to: "2027-04-13",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });



  it("should reject invalid date_from format", () => {
    cy.request({
      method: "GET",
      url: reportUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      qs: {
        period: "custom",
        date_from: "14-04-2026",
        date_to: "2027-04-13",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("should reject invalid date_to format", () => {
    cy.request({
      method: "GET",
      url: reportUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      qs: {
        period: "custom",
        date_from: "2026-04-14",
        date_to: "13-04-2027",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("should reject invalid date", () => {
    cy.request({
      method: "GET",
      url: reportUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      qs: {
        period: "custom",
        date_from: "2026-99-99",
        date_to: "2027-04-13",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("should reject when date_from is after date_to", () => {
    cy.request({
      method: "GET",
      url: reportUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      qs: {
        period: "custom",
        date_from: "2027-04-13",
        date_to: "2026-04-14",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


});