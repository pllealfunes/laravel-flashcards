describe("User logsin and goes to create page", () => {
    it("goes to create deck page", () => {
        cy.visit("/login");
        cy.get('input[id="email"]').type("katesmiles@example.com");
        cy.get('input[id="password"]').type("katenate24");
        cy.contains("Log in").click();
        cy.contains("You are Successfully Logged In").click();
        cy.visit("/createdeck");
        cy.get('input[name="title"]').should("exist");
    });
});

describe("User successfully creates deck", () => {
    it("goes to create deck page", () => {
        cy.visit("/login");
        cy.get('input[id="email"]').type("katesmiles@example.com");
        cy.get('input[id="password"]').type("katenate24");
        cy.contains("Log in").click();
        cy.contains("You are Successfully Logged In").click();
        cy.visit("/createdeck");
        cy.get('input[name="title"]').should("exist");
    });
});
