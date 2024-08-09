describe("The Home Page", () => {
    it("successfully loads", () => {
        cy.visit("/");
    });
});

describe("User Registration", () => {
    it("should load the registration page", () => {
        cy.visit("/register");
        cy.contains("Register"); // Check for the presence of the registration form
        cy.get('input[id="name"]').should("exist");
        cy.get('input[id="email"]').should("exist");
        cy.get('input[id="password"]').should("exist");
        cy.get('input[id="password_confirmation"]').should("exist");
        cy.contains("Register").should("exist"); // Ensure the register button is present
    });

    it("should show validation errors with invalid data", () => {
        cy.visit("/register");

        cy.get('input[id="name"]').type("Kate");
        cy.get('input[id="email"]').type("invalid-email");
        cy.get('input[id="password"]').type("short");
        cy.get('input[id="password_confirmation"]').type("short");
        cy.contains("Register").click();
    });

    it("should register a new user with valid data", () => {
        cy.visit("/register");

        cy.get('input[id="name"]').type("Kate");
        cy.get('input[id="email"]').type("katesmiles@example.com");
        cy.get('input[id="password"]').type("katenate24");
        cy.get('input[id="password_confirmation"]').type("katenate24");
        cy.contains("Register").click();

        // Verify redirection to home page
        cy.url().should("include", "/dashboard");
        cy.contains("Kate"); // Ensure user is redirected to the dashboard and logged in
    });

    it("should handle existing user registration attempt", () => {
        // Register a user with an email that already exists
        cy.visit("/register");

        cy.get('input[id="name"]').type("Existing User");
        cy.get('input[id="email"]').type("katesmiles@example.com"); // Assuming this email already exists
        cy.get('input[id="password"]').type("katenate24");
        cy.get('input[id="password_confirmation"]').type("katenate24");
        cy.contains("Register").click();

        // Verify that the appropriate error message is shown
        cy.contains("The email has already been taken."); // Adjust to match actual error messages
    });
});

describe("Login User", () => {
    it("successfully logsin a user", () => {
        cy.visit("/login");
        cy.get('input[id="email"]').type("katesmiles@example.com");
        cy.get('input[id="password"]').type("katenate24");
        cy.contains("Log in").click();
        cy.contains("You are Successfully Logged In").click();
    });
});
