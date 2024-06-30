<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
const { deck, flashcards } = defineProps({ deck: Object, flashcards: Object });

const answersArray = ref([]);
const questionsArray = ref([]);
const pickedCards = ref([]);
const newGame = ref(true);
const startTimer = ref(false);
const finalTime = ref(false);

answersArray.value = flashcards.map(function (flashcard) {
    return { type: "answer", value: flashcard.answer };
});

questionsArray.value = flashcards.map(function (flashcard) {
    return { type: "question", value: flashcard.question };
});

const currentCards = ref([...answersArray.value, ...questionsArray.value]);

const startGame = () => {
    shuffleCards();
    newGame.value = true;
};

const shuffleCards = () => {
    const originalDeck = [...currentCards.value]; // Create a copy of the original deck
    let shuffledDeck = shuffleDeck([...originalDeck]); // Initialize shuffled deck

    // Shuffle the deck until it's different from the original
    while (isSameDeck(originalDeck, shuffledDeck)) {
        shuffledDeck = shuffleDeck([...originalDeck]);
    }
    // Update the prop with the shuffled cards
    currentCards.value = shuffledDeck;
    return shuffledDeck;
};

// Function to check if two cards are the same
const isSameDeck = (card1, card2) => {
    if (card1.length !== card2.length) return false;
    for (let i = 0; i < card1.length; i++) {
        if (card1[i] !== card2[i]) return false;
    }
    return true;
};

// Function to shuffle a deck
const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

const flippedStates = ref(
    currentCards.value.map(() => ({
        flipped: false,
        style: "hidden",
    }))
);

const toggleFlip = (index, type) => {
    // Update the flipped state of the clicked card
    if (flippedStates.value[index].flipped || pickedCards.value.length === 2) {
        return;
    }

    flippedStates.value[index].flipped = !flippedStates.value[index].flipped;
    pickedCard(index, type);
};

function pickedCard(index, type) {
    if (pickedCards.value.length < 2) {
        pickedCards.value.push({ index, type });
    }

    if (pickedCards.value.length === 2) {
        compareCards();
    }
    console.log(pickedCards.value);
}

function compareCards() {
    const [firstCard, secondCard] = pickedCards.value;

    if (firstCard.type === secondCard.type) {
        // Clear selected cards for next round

        flippedStates.value[firstCard.index].style = "bg-red-500";
        flippedStates.value[secondCard.index].style = "bg-red-500";
        setTimeout(function () {
            flippedStates.value[firstCard.index].flipped =
                !flippedStates.value[firstCard.index].flipped;
            flippedStates.value[secondCard.index].flipped =
                !flippedStates.value[secondCard.index].flipped;
            pickedCards.value = [];
            flippedStates.value[firstCard.index].style = "bg-sky-950";
            flippedStates.value[secondCard.index].style = "bg-sky-950";
        }, 2000);
        return;
    }

    const questionCard = firstCard.type === "question" ? firstCard : secondCard;
    const answerCard = firstCard.type === "answer" ? firstCard : secondCard;

    const question = flashcards.find(
        (card) => card.question === currentCards.value[questionCard.index].value
    );
    const answer = answersArray.value[answerCard.index];

    if (question.answer === answer.value) {
        flippedStates.value[firstCard.index].style = "bg-green-500";
        flippedStates.value[secondCard.index].style = "bg-green-500";

        setTimeout(function () {
            flippedStates.value[firstCard.index].style = "hidden";
            flippedStates.value[secondCard.index].style = "hidden";
            currentCards.value.splice(firstCard);
            currentCards.value.splice(secondCard);
            pickedCards.value = [];
        }, 2000);
        return;
    } else {
        flippedStates.value[firstCard.index].style = "bg-red-500";
        flippedStates.value[secondCard.index].style = "bg-red-500";

        setTimeout(function () {
            flippedStates.value[firstCard.index].flipped =
                !flippedStates.value[firstCard.index].flipped;
            flippedStates.value[secondCard.index].flipped =
                !flippedStates.value[secondCard.index].flipped;
            pickedCards.value = [];
            flippedStates.value[firstCard.index].style = "bg-sky-950";
            flippedStates.value[secondCard.index].style = "bg-sky-950";
        }, 2000);

        return;
    }
}

const gameOver = () => {
    currentCards.value.length === 0;
    winMessage.value = true;
    newGame.value = false;
    startTimer.value = false;
    finalTime.value = false;
};
</script>

<template>
    <Head>
        <title>Memory Game: {{ deck.title }}</title>
    </Head>
    <AuthenticatedLayout>
        <h1
            class="mt-6 mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"
        >
            Memory Game: {{ deck.title }}
        </h1>
        <div class="flex flex-col justify-center items-center">
            <button
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                @click="startGame()"
            >
                New Game
            </button>
            <div>
                Studied: {{ currentCards.length / 2 }} /
                {{ flashcards.length }} Flashcards
            </div>
        </div>

        <div class="flex justify-center items-center mt-5">
            <div
                class="w-[400px] h-[400px] py-11 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"
            >
                <p class="text-2xl font-bold m-5">
                    You Did It {{ $page.props.auth.user.name }}!
                </p>
                <p class="text-2xl font-bold m-5">Your Final Time Was :</p>
            </div>
        </div>

        <section
            class="grid md:grid-cols-2 lg:grid-cols-4 gap-1"
            id="flashcardsDeck"
            v-if="newGame"
        >
            <div
                v-for="(card, index) in currentCards"
                :key="card.id"
                class="m-5 font-semibold flex flex-row justify-center items-center transition-transform duration-500 ease-in-out"
            >
                <div
                    class="w-[350px] h-[250px] dark:text-slate-200 border border-gray-200 rounded-lg shadow mb-2 flex flex-row justify-between cursor-pointer group perspective relative preserve-3d duration-1000"
                    :class="[
                        { 'flip-card': flippedStates[index].flipped },
                        flippedStates[index].style,
                    ]"
                    @click.stop="toggleFlip(index, card.type)"
                >
                    <div
                        class="flip-card backface-hidden w-full h-full rounded-lg"
                    >
                        <div
                            class="text-center text-md flex flex-col items-center justify-center h-full"
                        >
                            <p class="text-small">
                                {{ card.value }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
