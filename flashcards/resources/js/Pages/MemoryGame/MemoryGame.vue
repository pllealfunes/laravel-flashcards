<script setup>
import { ref, computed } from "vue";
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
const incorrectAttempts = ref(0);

const startRound = () => {
    gameCards.value =
        flashcards.length >= numCardsNeeded
            ? getRandomCards(flashcards, numCardsNeeded)
            : getRepeatedCards(flashcards, numCardsNeeded);
};

// Function to get random cards from the flashcards array
const getRandomCards = (cards, count) => {
    // Separate cards into question and answer categories
    const questionCards = cards.filter((card) => card.question);
    const answerCards = cards.filter((card) => card.answer);

    // Debugging logs to show filtered cards
    console.log("Question Cards:", questionCards);
    console.log("Answer Cards:", answerCards);

    // Randomly select half of the required count from each category
    const selectedQuestions = getRandomItems(questionCards, count / 2);
    const selectedAnswers = getRandomItems(answerCards, count / 2);

    // Combine selected questions and answers, then shuffle them
    const combinedCards = [...selectedQuestions, ...selectedAnswers];
    console.log("Selected Questions:", selectedQuestions);
    console.log("Selected Answers:", selectedAnswers);
    return shuffleArray(combinedCards);
};

// Function to get repeated cards when flashcards are insufficient
const getRepeatedCards = (cards, count) => {
    // Separate cards into question and answer categories
    const questionCards = cards.filter((card) => card.question);
    const answerCards = cards.filter((card) => card.answer);

    // Debugging logs to show filtered cards
    console.log("Question Cards:", questionCards);
    console.log("Answer Cards:", answerCards);

    // Randomly select half of the required count from each category
    const selectedQuestions = getRandomItems(questionCards, count / 2);
    const selectedAnswers = getRandomItems(answerCards, count / 2);

    // Combine selected questions and answers, then shuffle them
    const combinedCards = [...selectedQuestions, ...selectedAnswers];
    console.log("Selected Questions:", selectedQuestions);
    console.log("Selected Answers:", selectedAnswers);
    return shuffleArray(combinedCards);
};

// Function to get random items from an array
const getRandomItems = (array, count) => {
    const result = [];
    const totalItems = array.length;
    const indices = Array.from({ length: totalItems }, (_, i) => i);

    // Select 'count' random items from the array
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * (totalItems - i));
        result.push(array[indices[randomIndex]]);

        // Swap selected index with the last index to avoid duplicates
        [indices[randomIndex], indices[totalItems - i - 1]] = [
            indices[totalItems - i - 1],
            indices[randomIndex],
        ];
    }

    return result;
};

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

const resetWatch = () => {
    clearInterval(timer.value);
    startTime.value = 0;
    elapsedTime.value = 0;
    isRunning.value = false;
    displayTime.value = "00:00:00:00";
};

const updateWatch = () => {
    const currentTime = Date.now();
    elapsedTime.value = currentTime - startTime.value;
    const hours = String(
        Math.floor(elapsedTime.value / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
        Math.floor((elapsedTime.value / (1000 * 60)) % 60)
    ).padStart(2, "0");
    const seconds = String(
        Math.floor((elapsedTime.value / 1000) % 60)
    ).padStart(2, "0");
    const milliseconds = String(
        Math.floor((elapsedTime.value % 1000) / 10)
    ).padStart(2, "0");
    displayTime.value = `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

const isGameOver = computed(() => {
    return flippedStates.value.every((card) => card.style === "hidden");
});

const startGame = () => {
    resetWatch();
    gameCards.value = [];
    pickedCards.value = [];
    results.value = false;
    newGame.value = true;
    startRound();
    incorrectAttempts.value = 0;

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

const compareCards = () => {
    const [firstCard, secondCard] = pickedCards.value;
    if (firstCard.type === secondCard.type) {
        setCardStyles(firstCard.index, secondCard.index, "bg-red-500", 2000);
        incorrectAttempts.value++;
        return;
    }

    const questionCard = firstCard.type === "question" ? firstCard : secondCard;
    const answerCard = firstCard.type === "answer" ? firstCard : secondCard;
    const question = flashcards.find(
        (card) => card.question === currentCards.value[questionCard.index].value
    );
    const answer = answersArray.value[answerCard.index];

    if (question.answer === answer.value) {
        setCardStyles(
            firstCard.index,
            secondCard.index,
            "bg-green-500",
            2000,
            "hidden"
        );
    } else {
        setCardStyles(firstCard.index, secondCard.index, "bg-red-500", 2000);
        incorrectAttempts.value++;
    }
};

const setCardStyles = (
    firstIndex,
    secondIndex,
    style,
    timeout,
    hiddenStyle = "bg-sky-950"
) => {
    flippedStates.value[firstIndex].style = style;
    flippedStates.value[secondIndex].style = style;
    setTimeout(() => {
        flippedStates.value[firstIndex].style = hiddenStyle;
        flippedStates.value[secondIndex].style = hiddenStyle;
        flippedStates.value[firstIndex].flipped =
            hiddenStyle === "bg-sky-950"
                ? false
                : flippedStates.value[firstIndex].flipped;
        flippedStates.value[secondIndex].flipped =
            hiddenStyle === "bg-sky-950"
                ? false
                : flippedStates.value[secondIndex].flipped;
        pickedCards.value = [];
        checkGameOver();
    }, timeout);
};
</script>

<template>
    <Head title="Memory Game" />
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
                <p class="text-2xl font-bold m-5">
                    Number of Failed Attempts :
                </p>
                <p class="text-2xl font-bold m-5">
                    {{ incorrectAttempts }}
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
