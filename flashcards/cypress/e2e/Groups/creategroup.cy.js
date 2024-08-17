describe("User login and create group", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katethomas@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katecake94");
        cy.get('[data-testid="login-btn"]').click();

        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");
        cy.get('[data-testid="create-group-btn"]').click();
    });

    it("should show validation errors with invalid data", () => {
        cy.get('[data-testid="group-submit-btn"]').click();

        // Verify validation errors
        cy.contains("The title field is required.");
        cy.contains("You must select at least one deck.");
    });

    it("should create a group successfully", () => {
        // Enter group title
        cy.get('[data-testid="title-input-group"]').type("Test Group");

        // Check deck to add to group
        cy.get('[data-testid="checkbox-deck"]').first().check();

        cy.get('[data-testid="group-submit-btn"]').click();

        // Verify deck creation
        cy.contains("Group created successfully.");
    });
});
