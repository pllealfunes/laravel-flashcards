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
        cy.visit("/createdeck");
    });

    it("should load the deck creation page", () => {
        // Ensure the title input field exists
        cy.get('[data-testid="title-input-create"]').should("exist");
    });

    it("should show validation errors with invalid data", () => {
        // Enter deck title
        cy.get('[data-testid="title-input-create"]').type("Test Deck");

        // Add flashcards
        cy.get('[data-testid="add-card-btn-create"]').click();

        // Add invalid flashcards
        cy.get('[data-testid="question-input-create"]')
            .first()
            .type("example question"); // Invalid
        cy.get('[data-testid="answer-input-create"]')
            .first()
            .type("example answer");
        cy.get('[data-testid="create-deck-btn"]').click();

        // Verify validation errors
        cy.contains("The flashcards field must have at least 2 items.");
        cy.contains(
            "The difficulty level field is required for all flashcards."
        );
        cy.contains("The points field is required for all flashcards.");
    });

    it("should create a deck successfully", () => {
        // Enter valid data
        cy.get('[data-testid="title-input-create"]').type("Test Deck");
        cy.get('[data-testid="add-card-btn-create"]').click();

        // Add valid flashcards
        cy.get('[data-testid="question-input-create"]')
            .first()
            .type("What is the capital of France?");
        cy.get('[data-testid="answer-input-create"]').first().type("Paris");
        cy.get('[data-testid="hint-input-create"]')
            .first()
            .type("It starts with the letter P");
        cy.get('[data-testid="difficulty-select-create"]')
            .first()
            .select("easy");
        cy.get('[data-testid="points-select-create"]').first().select("1");

        // Add second valid flashcard

        // Add flashcards
        cy.get('[data-testid="add-card-btn-create"]').click();

        cy.get('[data-testid="question-input-create"]')
            .eq(1)
            .type("What is 2 + 2?");
        cy.get('[data-testid="answer-input-create"]').eq(1).type("4");
        cy.get('[data-testid="difficulty-select-create"]')
            .eq(1)
            .select("medium");
        cy.get('[data-testid="points-select-create"]').eq(1).select("3");

        // Verify deck creation
        cy.get('[data-testid="create-deck-btn"]').click();
        cy.contains("Successfully Created Deck.");
        cy.url().should("include", "/dashboard");
    });

    it("should create a second deck successfully", () => {
        // Enter valid data
        cy.get('[data-testid="title-input-create"]').type("Test Deck 2");
        cy.get('[data-testid="add-card-btn-create"]').click();

        // Add valid flashcards
        cy.get('[data-testid="question-input-create"]')
            .first()
            .type("What is the capital of France?");
        cy.get('[data-testid="answer-input-create"]').first().type("Paris");
        cy.get('[data-testid="hint-input-create"]')
            .first()
            .type("It starts with the letter P");
        cy.get('[data-testid="difficulty-select-create"]')
            .first()
            .select("easy");
        cy.get('[data-testid="points-select-create"]').first().select("1");

        // Add second valid flashcard

        // Add flashcards
        cy.get('[data-testid="add-card-btn-create"]').click();

        cy.get('[data-testid="question-input-create"]')
            .eq(1)
            .type("What is 2 + 2?");
        cy.get('[data-testid="answer-input-create"]').eq(1).type("4");
        cy.get('[data-testid="difficulty-select-create"]')
            .eq(1)
            .select("medium");
        cy.get('[data-testid="points-select-create"]').eq(1).select("3");

        // Verify deck creation
        cy.get('[data-testid="create-deck-btn"]').click();
        cy.contains("Successfully Created Deck.");
        cy.url().should("include", "/dashboard");
    });
});
