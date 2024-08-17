describe("User login and create deck", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katesmiles@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katenate24");
        cy.get('[data-testid="login-btn"]').click();

        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");

        cy.get('[data-testid="flashcard-title"]').click();
        cy.get('[data-testid="edit-deck-btn"]').click();
    });

    it("Can delete a deck", () => {
        cy.get('[data-testid="delete-deck-btn"]').click();

        // Ensure the modal is open
        cy.contains("Are you sure you want to delete this deck?").should(
            "be.visible"
        );
        cy.contains("Yes, I'm sure").should("be.visible").click();
    });
});
