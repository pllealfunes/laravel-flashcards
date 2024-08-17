describe("User login and update deck", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-testid="email-input-login"]').type(
            "katethomas@example.com"
        );
        cy.get('[data-testid="password-input-login"]').type("katecake94");
        cy.get('[data-testid="login-btn"]').click();

        // Wait for successful login
        cy.contains("You are Successfully Logged In").should("exist");

        cy.get('[data-testid="deck-title"]').click();
        cy.get('[data-testid="edit-deck-btn"]').click();
    });

    // Unsuccessfully Update Deck Title
    it("should show validation errors with invalid data for updating deck title", () => {
        cy.get('[data-testid="edit-deck-title-icon"]').click();
        cy.get('input[id="title"]').clear();
        cy.get('[data-testid="edit-deck-title-btn"]').click();
        cy.contains("The title field is required.");
    });

    // Successfully Update Deck Title
    it("Can update a deck title", () => {
        cy.get('[data-testid="edit-deck-title-icon"]').click();
        cy.get('input[id="title"]').clear().type("New Title");
        cy.get('[data-testid="edit-deck-title-btn"]').click();
    });

    // Unsuccessfully Update Flashcard
    it("should show validation errors with invalid data for updating flashcard", () => {
        // Open the update card modal
        cy.contains("What is the capital of France?")
            .parents('[data-testid="flashcard-item"]')
            .find('[data-testid="update-card-btn"]')
            .click();

        // Ensure the modal is open
        cy.get('[data-testid="update-card-modal"]').should("be.visible");

        // Update card details
        cy.get('[data-testid="question-input"]').first().clear({ force: true });
        cy.get('[data-testid="answer-input"]').first().clear({ force: true });
        cy.get('[data-testid="hint-input"]').first().clear({ force: true });
        cy.get("button").contains("Submit").first().click({ force: true });
        cy.contains("The question field is required.");
        cy.contains("The answer field is required.");
    });

    // Update Flashcard
    it("Can update a flashcard in the deck", () => {
        // Open the update card modal
        cy.contains("What is the capital of France?")
            .parents('[data-testid="flashcard-item"]')
            .find('[data-testid="update-card-btn"]')
            .click();

        // Ensure the modal is open
        cy.get('[data-testid="update-card-modal"]').should("be.visible");

        // Update card details
        cy.get('[data-testid="question-input"]')
            .first()
            .clear({ force: true })
            .type("What is the capital of Germany?", { force: true });
        cy.get('[data-testid="answer-input"]')
            .first()
            .clear({ force: true })
            .type("Berlin", { force: true });
        cy.get('[data-testid="hint-input"]')
            .first()
            .clear({ force: true })
            .type("It starts with the letter B", { force: true });
        cy.get("button").contains("Submit").first().click({ force: true });

        // Assert success or updated content
        cy.contains("Successfully Updated Card.").should("exist");
    });

    // Delete Flashcard
    it("Can delete a flashcard in the deck", () => {
        // Open the update card modal
        cy.contains("What is the capital of Germany?")
            .parents('[data-testid="flashcard-item"]')
            .find('[data-testid="delete-card-btn"]')
            .click();

        // Ensure the modal is open
        cy.contains("Are you sure you want to delete this card?").should(
            "be.visible"
        );
        cy.contains("Are you sure you want to delete this card?")
            .parents('[data-testid="delete-modal"]')
            .find('[data-testid="confirm-delete-btn"]')
            .click();

        // Assert success or updated content
        cy.contains("Successfully Deleted Card.").should("exist");
    });

    // Unsuccessfully Create Flashcard
    it("should show validation errors with invalid data for creating flashcard", () => {
        cy.get('[data-testid="add-card-deck-btn"]').click();

        cy.get('[data-testid="new-card-submit"]').click();

        cy.contains("The question field is required.");
        cy.contains("The answer field is required.");
        cy.contains("The points field is required.");
        cy.contains("The difficulty field is required.");
    });

    // Create Flashcard
    it("Can create a flashcard in the deck", () => {
        cy.get('[data-testid="add-card-deck-btn"]').click();

        // Add valid flashcard
        cy.get('[data-testid="question-input"]')
            .first()
            .type("What is the formula for the pythagorean theorem?");
        cy.get('[data-testid="answer-input"]').first().type("a^2 + b^2 = c^2");
        cy.get('[data-testid="difficulty-select"]').first().select("easy");
        cy.get('[data-testid="points-select"]').first().select("1");
        cy.get('[data-testid="new-card-submit"]').click();

        // Assert success or updated content
        cy.contains("Successfully created a new card.").should("exist");
    });
});
