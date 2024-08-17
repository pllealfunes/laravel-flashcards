describe("User login and update group", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katesmiles@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katenate24");
        cy.get('[data-testid="login-btn"]').click();

        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");
        cy.get('[data-testid="deck-title"]').first().click();
    });

    // Successfully Update Group Title
    it("should take me to the memory game page and display cards", () => {
        cy.get('[data-testid="games-dropdown"]').click();
        cy.get('[data-testid="memory-game-btn"]').click();
        cy.get('[data-testid="new-game-btn"]').click();
        cy.get('[data-testid="memory-cards-display"]');
    });
});
