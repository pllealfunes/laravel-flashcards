describe("The Home Page", () => {
    it("successfully loads", () => {
        cy.visit("/");
    });
});

describe("User Registration", () => {
    it("should load the registration page", () => {
        cy.visit("/register");
        cy.contains("Register"); // Check for the presence of the registration form
        cy.get('[data-testid="name-input-register"]').should("exist");
        cy.get('[data-testid="email-input-register"]').should("exist");
        cy.get('[data-testid="password-input-register"]').should("exist");
        cy.get('[data-testid="password-confirmation-input-register"]').should(
            "exist"
        );
        cy.get('[data-testid="register-btn"]').should("exist"); // Ensure the register button is present
    });

    it("should show validation errors with invalid data", () => {
        cy.visit("/register");

        cy.get('[data-testid="name-input-register"]').type("Kate Thomas");
        cy.get('[data-testid="email-input-register"]').type("invalid-email");
        cy.get('[data-testid="password-input-register"]').type("short");
        cy.get('[data-testid="password-confirmation-input-register"]').type(
            "short"
        );
        cy.get('[data-testid="register-btn"]').click();
    });

    it("should register a new user with valid data", () => {
        cy.visit("/register");

        cy.get('[data-testid="name-input-register"]').type("Kate Thomas");
        cy.get('[data-testid="email-input-register"]').type(
            "katethomas@example.com"
        );
        cy.get('[data-testid="password-input-register"]').type("katecake94");
        cy.get('[data-testid="password-confirmation-input-register"]').type(
            "katecake24"
        );
        cy.get('[data-testid="register-btn"]').click();

        // Verify redirection to home page
        cy.url().should("include", "/dashboard");
        cy.contains("Kate"); // Ensure user is redirected to the dashboard and logged in
    });

    it("should handle existing user registration attempt", () => {
        // Register a user with an email that already exists
        cy.visit("/register");

        cy.get('[data-testid="name-input-register"]').type("Existing User");
        cy.get('[data-testid="email-input-register"]').type(
            "katethomas@example.com"
        ); // Assuming this email already exists
        cy.get('[data-testid="password-input-register"]').type("katecake94");
        cy.get('[data-testid="password-confirmation-input-register"]').type(
            "katecake94"
        );
        cy.get('[data-testid="register-btn"]').click();

        // Verify that the appropriate error message is shown
        cy.contains("The email has already been taken."); // Adjust to match actual error messages
    });
});

describe("Login User", () => {
    it("successfully logsin a user", () => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katethomas@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katecake94");
        cy.get('[data-testid="login-btn"]').click();

        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");
    });
});
