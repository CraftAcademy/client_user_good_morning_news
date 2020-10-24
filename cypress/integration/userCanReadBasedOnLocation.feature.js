const stubLocation = require("../support/stubLocation");

const apiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;


describe("user can read articles ", () => {
  context('when in sweden', () => {
    before(() => {
      cy.server()
      // cy.route({
      //   method: "GET",
      //   url: "http://localhost:3000/api/v1/articles?latitude=60&longitude=18",
      //   response: "fixture:sweden_articles.json"
      // })
      
      cy.route({
        method: "GET",
        url: `http://api.opencagedata.com/geocode/v1/json?q=60%2C18&language=en&key=${apiKey}`,
        response: "fixture:sweden_index.json",
      });

      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles/?location=sweden",
        response: "fixture:sweden_index.json",
      });


      cy.visit("/", stubLocation({
        latitude: 60, 
        longitude: 18,
      }));
      cy.get('[href="/articles/local"]').click();
    })
    it('Visitors can see which different version of local news', () => {
      cy.get("#current-position").should('contain', "Local News From Sweden")
    })
    it("Visitors can see article one", () => {
      cy.get("#article-1").within(() => {
        cy.get("#title").should("contain", "Scrum God");
        cy.get("#lead").should("contain", "God of all coharts");
      });
    });
    it("Visitors can see list article two", () => {
      cy.get("#article-2").within(() => {
        cy.get("#title").should("contain", "Sad Campers");
        cy.get("#lead").should("contain", "Sad campers is always a losers");
      });
    });
  })
})