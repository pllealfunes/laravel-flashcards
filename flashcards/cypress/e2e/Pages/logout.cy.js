describe("Logout User", () => {
    it("successfully logsout a user", () => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katesmiles@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katenate24");
        cy.get('[data-testid="login-btn"]').click();

        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");

        cy.get('[data-testid="logout-dropdown-btn"]').click();
        cy.get('[data-testid="logout-btn"]').click();

        cy.contains("Study Smarter Not Harder.").should("exist");
        cy.contains("Log in").should("exist");
    });
});
