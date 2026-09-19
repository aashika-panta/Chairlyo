describe("Chairlyo Waiting API", () => {

  const loginUrl =
    "https://qa02.base.chairlyo.com/api/accounts/login/";

  const waitingUrl =
    "https://qa02.base.chairlyo.com/api/waiting/";

  let accessToken;

  before(() => {
    cy.env([
      "BRANCH_ADMIN_EMAIL",
      "BRANCH_ADMIN_PASSWORD"
    ]).then((env) => {

      cy.request({
        method: "POST",
        url: loginUrl,

        body: {
          email: env.BRANCH_ADMIN_EMAIL,
          password: env.BRANCH_ADMIN_PASSWORD,
        },

      }).then((response) => {

        expect(response.status).to.eq(200);

        accessToken = response.body.access;
      });
    });
  });

  it("should add customer to waiting list successfully", () => {

    cy.request({
      method: "POST",
      url: waitingUrl,

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      body: {
        customer: 49,
        note: "",
        items: [
          {
            item_type: "service",
            service: 56,
            quantity: 1,
            price: "1000.00",
            assigned_staff: 127,
            staff_shares: [],
          },
        ],
      },

      failOnStatusCode: false,

    }).then((response) => {

      cy.log(`STATUS: ${response.status}`);

      cy.log(
        `RESPONSE: ${JSON.stringify(response.body)}`
      );

      console.log("STATUS:", response.status);
      console.log("RESPONSE BODY:", response.body);

      // Temporary debugging assertion
      expect(response.status).to.eq(201);
    });

  });

});