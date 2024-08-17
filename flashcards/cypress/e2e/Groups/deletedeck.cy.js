describe("User login and delete deck from group", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katethomas@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katecake94");
        cy.get('[data-testid="login-btn"]').click();
        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");
        cy.get('[data-testid="group-title"]').first().click();
    });

    // Successfully Remove Deck from Group
    it("Can successfully remove a deck from a group", () => {
        cy.get('[data-testid="delete-deck-modal"]').first().click();
        // Ensure the modal is open
        cy.contains("Are you sure you want to remove this deck?").should(
            "be.visible"
        );

        cy.contains("Are you sure you want to remove this deck?")
            .parents('[data-testid="delete-modal"]')
            .find('[data-testid="confirm-delete-btn"]')
            .click();
    });
});
