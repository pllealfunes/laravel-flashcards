# Flash

Developed an application allowing users to create flashcard decks and groups, play games like memory and matching games, and test their knowledge with quizzes. Built with Laravel, Breeze, Vue, Inertia, &amp; Tailwind, and deployed on Digital Ocean's App Platform. Testing done with PHPUnit for the back end and Cypress for the front end.

Watch the Video for a Glimpse!:

[![Watch the video](https://img.youtube.com/vi/1VNtswo5Kf8/maxresdefault.jpg)](https://www.youtube.com/watch?v=1VNtswo5Kf8)

## Default User Seed

The default user after running php artisan db:seed will be:

name: Beth Thomas
emaail: beth99@email.com
password: bethmary99

## Current Functionalities :

- Create user account
- Login and Logout user account
- View All Decks in Dashboard
- Decks show the timestamp of the last time they've been viewed
- View All Decks in Dashboard
- Create Deck with Title and a 2 Flashcard minimum
- Can view Deck - study the cards using arrows and view entire list of Flashcards in the Deck
- Can Update Deck Title
- Can Update Individual Flashcards in the Deck
- Can Delete Individual Flashcards in the Deck
- Can Create New Flashcards in the Deck
- Can Delete Deck
- Can create a Group and add Decks to the Group
- Can Update Group Title
- Can Add Deck to Group
- Can Remove Deck from Group
- Can Delete Group and Keep Decks
- Can Delete Group along with all Decks inside
- Quiz
- Memory Game
- Matching Game - drag and drop

## Learning Tools :

- Laracasts Forum for Help
- Codeaholic PHP 6+ HR Tutorial
- Susan Codes YT Channel
- Unsplash - Matt Ragland School Essentials
- Storyset for Home character photos
- Flowbite for UI
- ChatGPT For Problem Solving and testing
- Code A Program YT - Animated 3D Crad Design Using Tailwind CSS | tailwind css advanced tutorial
- Heroicons - for logo and icons
- BroCode YT Video - Build this JS STOPWATCH in 18 minutes! 2024
- Other resources through Google and YouTube

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Set up the environment file:**

   Copy the example environment file and update it with your configuration.

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database credentials and other environment-specific settings.

3. **Install PHP dependencies:**

   ```bash
   composer install
   ```

4. **Install JavaScript dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

5. **Set up the database:**

   Create a database and update `.env` with the correct database settings.

   Run migrations and seed the database:

   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Build the frontend assets:**

   ```bash
   npm run build
   # or
   yarn build
   ```

7. **Run the development server:**

   Start the PHP development server:

   ```bash
   php artisan serve
   ```

   Start the Vite development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

8. **Access the application:**

   Open your browser and navigate to the name of application. I have it in HERD as http://flashcards.test.

## Running Tests

Run the following command to execute the tests for the back end:

````bash
php artisan test

Run the following command to execute the tests for the front end:

```bash
npx cypress open
````
