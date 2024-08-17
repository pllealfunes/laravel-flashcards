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
        cy.get('[data-testid="group-title"]').first().click();
    });

    // Unsuccessfully add deck to group
    it("Can add a deck to the group", () => {
        cy.get('[data-testid="add-deck"]').click();

        cy.get('[data-testid="add-card-submit"]').click();
    });

    // Successfully add deck to group
    it("Can add a deck to the group", () => {
        cy.get('[data-testid="add-deck"]').click();
        // Check deck to add to group
        cy.get('[data-testid="checkbox-deck-add"]').first().check();

        cy.get('[data-testid="add-card-submit"]').click();

        // Ensure the modal is open
        cy.contains("Are you sure you want to add the following decks?").should(
            "be.visible"
        );
        cy.contains("Yes, I'm sure").should("be.visible").click();
    });
});
