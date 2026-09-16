const loginUrl =
  "https://qa02.base.chairlyo.com/api/accounts/login/";

const branchUrl =
  "https://qa02.base.chairlyo.com/api/branch/branches/";

describe("Chairlyo Branch APIs", () => {

  let accessToken;

  // Login as Super Admin
  before(() => {

    cy.env(["USERNAME", "PASSWORD"]).then((env) => {

      cy.request({
        method: "POST",
        url: loginUrl,

        headers: {
          "Content-Type": "application/json",
        },

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


  // CREATE BRANCH
  it("should create a new branch", () => {

    const uniqueId = Date.now();

    cy.request({

      method: "POST",

      url: branchUrl,

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      body: {
        name: `Test Branch ${uniqueId}`,
        slug: `test-branch-${uniqueId}`,
        status: "active",
        email: `branch${uniqueId}@example.com`,
        phone: "+9779800000000",
        address: "Kathmandu",
        timezone: null,
      },

      failOnStatusCode: false,

    }).then((response) => {

      cy.log("Status: " + response.status);

      cy.log(
        "Response: " +
        JSON.stringify(response.body)
      );

      expect(response.status).to.eq(201);
      expect(response.body).to.exist;
    });
  });


  // EMPTY NAME
  it("should reject branch without name", () => {

    const uniqueId = Date.now();

    cy.request({

      method: "POST",

      url: branchUrl,

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      body: {
        name: "",
        slug: `empty-name-${uniqueId}`,
        status: "active",
        email: `emptyname${uniqueId}@example.com`,
        phone: "+9779800000000",
        address: "Kathmandu",
        timezone: null,
      },

      failOnStatusCode: false,

    }).then((response) => {

      expect(response.status).to.eq(400);
    });
  });


  // EMPTY EMAIL
  it("should reject branch without email", () => {

    const uniqueId = Date.now();

    cy.request({

      method: "POST",

      url: branchUrl,

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      body: {
        name: `Email Test ${uniqueId}`,
        slug: `email-test-${uniqueId}`,
        status: "active",
        email: "",
        phone: "+9779800000000",
        address: "Kathmandu",
        timezone: null,
      },

      failOnStatusCode: false,

    }).then((response) => {

      expect(response.status).to.eq(400);
    });
  });


  // INVALID STATUS
  it("should reject invalid branch status", () => {

    const uniqueId = Date.now();

    cy.request({

      method: "POST",

      url: branchUrl,

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      body: {
        name: `Invalid Status ${uniqueId}`,
        slug: `invalid-status-${uniqueId}`,
        status: "invalid",
        email: `invalidstatus${uniqueId}@example.com`,
        phone: "+9779800000000",
        address: "Kathmandu",
        timezone: null,
      },

      failOnStatusCode: false,

    }).then((response) => {

      expect(response.status).to.eq(400);
    });
  });


  // WITHOUT TOKEN
  it("should reject branch creation without token", () => {

    const uniqueId = Date.now();

    cy.request({

      method: "POST",

      url: branchUrl,

      headers: {
        "Content-Type": "application/json",
      },

      body: {
        name: `No Token ${uniqueId}`,
        slug: `no-token-${uniqueId}`,
        status: "active",
        email: `notoken${uniqueId}@example.com`,
        phone: "+9779800000000",
        address: "Kathmandu",
        timezone: null,
      },

      failOnStatusCode: false,

    }).then((response) => {

      expect(response.status).to.not.eq(201);
    });
  });

});