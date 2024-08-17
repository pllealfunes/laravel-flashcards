describe("User login and delete a group while the decks remain", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katesmiles@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katenate24");
        cy.get('[data-testid="login-btn"]').click();

        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");
        cy.get('[data-testid="group-title"]').first().click();
    });

    // Successfully Remove Deck from Group
    it("Can successfully delete a group", () => {
        cy.get('[data-testid="delete-group-modal"]').first().click();
        // Ensure the modal is open
        cy.contains("Are you sure you want to delete only the group?").should(
            "be.visible"
        );

        cy.contains("Are you sure you want to delete only the group?")
            .parents('[data-testid="delete-modal"]')
            .find('[data-testid="confirm-delete-btn"]')
            .click();
    });
});
