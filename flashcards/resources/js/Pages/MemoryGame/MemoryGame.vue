<script setup>
import { ref, computed, onMounted } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
const { deck, flashcards } = defineProps({ deck: Object, flashcards: Array });

const currentCards = ref([]);
const flippedStates = ref([]);
const answersArray = ref([]);
const questionsArray = ref([]);
const pickedCards = ref([]);
const timer = ref(null);
const newGame = ref(false);
const startTime = ref(0);
const elapsedTime = ref(0);
const isRunning = ref(false);
const displayTime = ref("");
const results = ref(false);
const gameCards = ref([]);
const numCardsNeeded = 6;

const startRound = () => {
    if (flashcards.length >= numCardsNeeded) {
        // If there are enough cards, select 10 random cards
        for (let i = 0; i < numCardsNeeded; i++) {
            gameCards.value.push(
                flashcards[Math.floor(Math.random() * flashcards.length)]
            );
        }
        return gameCards.value;
    } else {
        // If there are not enough cards, repeat cards to reach 10
        let selectedCards = [];
        const availableCards = [...flashcards]; // Copy the available cards

        while (selectedCards.length < numCardsNeeded) {
            const remainingCards = numCardsNeeded - selectedCards.length;
            // Shuffle the available cards to ensure randomness
            availableCards.sort(() => 0.5 - Math.random());
            selectedCards = [
                ...selectedCards,
                ...availableCards.slice(0, remainingCards),
            ];
        }
        return (gameCards.value = selectedCards);
    }
};

const startWatch = () => {
    if (!isRunning.value) {
        startTime.value = Date.now() - elapsedTime.value;
        timer.value = setInterval(updateWatch, 10);
        isRunning.value = true;
    }
};

const stopWatch = () => {
    if (isRunning.value) {
        clearInterval(timer.value);
        elapsedTime.value = Date.now() - startTime.value;
        isRunning.value = false;
    }
};

const reset = () => {
    clearInterval(timer.value);
    startTime.value = 0;
    elapsedTime.value = 0;
    isRunning.value = false;
    displayTime.value = "00:00:00:00";
};

const updateWatch = () => {
    const currentTime = Date.now();
    elapsedTime.value = currentTime - startTime.value;

    let hours = Math.floor(elapsedTime.value / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime.value / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime.value / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime.value % 1000) % 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    displayTime.value = `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

const isGameOver = computed(() => {
    return flippedStates.value.every((card) => card.style === "hidden");
});

const startGame = () => {
    reset();
    gameCards.value = [];
    pickedCards.value = [];
    results.value = false;
    newGame.value = true;
    startRound();

    answersArray.value = gameCards.value.map(function (flashcard) {
        return { type: "answer", value: flashcard.answer };
    });

    questionsArray.value = gameCards.value.map(function (flashcard) {
        return { type: "question", value: flashcard.question };
    });

    currentCards.value = [...answersArray.value, ...questionsArray.value];

    flippedStates.value = currentCards.value.map(() => ({
        flipped: false,
        style: "bg-sky-950",
    }));

    startWatch();
};

const checkGameOver = () => {
    if (isGameOver.value) {
        newGame.value = false;
        results.value = true;
        stopWatch();
    }
};

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
}

function compareCards() {
    const [firstCard, secondCard] = pickedCards.value;

    if (firstCard.type === secondCard.type) {
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
            pickedCards.value = [];
            checkGameOver();
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
            <div v-if="newGame">{{ displayTime }}</div>
        </div>

        <div v-if="results" class="flex justify-center items-center mt-5">
            <div
                class="w-[400px] h-[400px] py-11 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"
            >
                <p class="text-2xl font-bold m-5">
                    You Did It {{ $page.props.auth.user.name }}!
                </p>
                <p class="text-2xl font-bold m-5">Your Final Time Was :</p>
                <p class="text-2xl font-bold m-5">
                    {{ displayTime }}
                </p>
            </div>
        </div>

        <section class="flex flex-col justify-center items-center">
            <div
                v-if="newGame"
                class="grid md:grid-cols-2 lg:grid-cols-4"
                id="flashcardsDeck"
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
            </div>
            <div
                v-if="!newGame && !results"
                class="w-[400px] h-[400px] mt-7 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"
            >
                <p class="text-justify p-14 font-bold">
                    <b class="text-black">Rules of The Game :</b> Click on the
                    New Game button to start a new game. Click on each card to
                    try and match the questions to their answers. At the end of
                    the game the total time it took you to finish will be
                    displayed.
                </p>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
