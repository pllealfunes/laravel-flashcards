<script setup>
import { ref, onMounted } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";

const { deck, flashcards } = defineProps({ deck: Object, flashcards: Array });
const startQuiz = ref(false);
const currentCards = ref([]);
const currentAnswers = ref([]);
const score = ref(0);
const possibleScore = ref(0);
const highScore = ref(false);
const lowScore = ref(false);
const correctCards = ref([]);
const incorrectCards = ref([]);
const numRandomAnswers = 2;
const showScore = ref(false);
const showCorrectAnswers = ref(false);
const showIncorrectAnswers = ref(false);
//shuffles the flashcards array using shuffleDeck, maps each card to a new object with shuffled answers using getRandomAnswers, & assigns the result to currentCards.value
onMounted(() => {
    newQuiz();
});

//shuffles an array in place using the Fisher-Yates algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
};

// shuffles a deck of flashcards by shuffling each card's answers and then shuffling the entire deck
const shuffleDeck = (deck) => {
    for (const card of deck) {
        const otherAnswers = deck
            .filter((c) => c !== card) // Exclude the current card
            .map((c) => c.answer); // Get answers from other cards
        card.answers = [...otherAnswers];
        card.answers = shuffleArray(card.answers.map((a) => a.toLowerCase())); // Shuffle lowercase answers
    }
    shuffleArray(deck);
    return deck;
};

// returns a shuffled array of random answers for a given flashcard
const getRandomAnswers = (answer, card) => {
    let choices = shuffleArray([
        ...card.answers.map((a) => a.toLowerCase()),
    ]).slice(0, numRandomAnswers); // Lowercase random answers
    choices.push(answer);
    choices = shuffleArray(choices);
    return choices;
};

const checkAnswers = () => {
    currentCards.value.forEach((card, index) => {
        const userAnswer = currentAnswers.value[index];
        possibleScore.value += parseInt(card.points);
        if (card.answer === userAnswer) {
            score.value += parseInt(card.points);
            correctCards.value.push(card);
        } else {
            incorrectCards.value.push({ card, userAnswer });
        }
    });
    checkScore();
    startQuiz.value = false;
    scrollToTop();
};

const checkScore = () => {
    const percentage = (score.value / possibleScore.value) * 100;
    if (percentage >= 70) {
        lowScore.value = false;
        highScore.value = true;
        showScore.value = true;
    } else {
        highScore.value = false;
        lowScore.value = true;
        showScore.value = true;
    }
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const newQuiz = () => {
    currentCards.value = shuffleDeck([...flashcards]).map((card) => ({
        ...card,
        answers: getRandomAnswers(card.answer, card),
    }));
    startQuiz.value = true;
};

const restartQuiz = () => {
    newQuiz();
    currentAnswers.value = [];
    score.value = 0;
    possibleScore.value = 0;
    highScore.value = false;
    lowScore.value = false;
    correctCards.value = [];
    incorrectCards.value = [];
    showScore.value = false;
    showCorrectAnswers.value = false;
    showIncorrectAnswers.value = false;
};

const toggleCorrectAnswers = () => {
    showCorrectAnswers.value = !showCorrectAnswers.value;
};
const toggleIncorrectAnswers = () => {
    showIncorrectAnswers.value = !showIncorrectAnswers.value;
};
</script>

<template>
    <Head>
        <title>Quiz: {{ deck.title }}</title>
    </Head>
    <AuthenticatedLayout>
        <div class="flex justify-center items-center">
            <h1
                class="mt-6 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"
            >
                Quiz: {{ deck.title }}
            </h1>
            <div v-if="showScore" class="flex justify-center items-center m-2">
                <div
                    class="w-16 h-16 p-11 rounded-full flex items-center justify-center text-white"
                    :class="{
                        'bg-green-500': highScore,
                        'bg-red-500': lowScore,
                    }"
                >
                    <span class="text-2xl font-bold m-2">{{ score }}</span>
                    <span class="text-2xl font-bold">/</span>
                    <span class="text-2xl font-bold m-2">{{
                        possibleScore
                    }}</span>
                </div>
            </div>
        </div>
        <div
            v-if="startQuiz"
            class="quiz-container flex flex-col justify-center items-center"
        >
            <div
                v-for="(flashcard, index) in currentCards"
                :key="flashcard.id"
                class="m-5 flex flex-col flex-wrap justify-center items-center"
            >
                <div
                    class="w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
                >
                    <p class="text-slate-200 flex justify-end mt-3 mr-3">
                        POINTS: {{ flashcard.points }}
                    </p>
                    <div class="w-full h-full p-4">
                        <h3
                            class="flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"
                        >
                            {{ flashcard.question }}
                        </h3>
                    </div>
                </div>
                <div class="answers-container">
                    <div>
                        <ul
                            class="flex flex-col justify-between items-center gap-3 mt-5"
                        >
                            <li
                                v-for="(answer, cardIndex) in flashcard.answers"
                                :key="cardIndex"
                                class="w-[500px] p-11 text-gray-800 border border-gray-200 rounded-lg shadow dark:bg-slate-400 dark:border-slate-400 mb-2 hover:bg-slate-500 hover:text-gray-200 hover:cursorpointer"
                            >
                                <label :for="`answer-${index}-${cardIndex}`">
                                    <input
                                        type="radio"
                                        :id="`answer-${index}-${cardIndex}`"
                                        :value="answer"
                                        v-model="currentAnswers[index]"
                                    />
                                    {{ answer }}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <button
                type="button"
                class="mt-11 w-1/4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                :disabled="showScore"
                :class="{
                    'cursor-not-allowed': showScore,
                }"
                @click="checkAnswers"
            >
                Submit
            </button>
        </div>
        <div v-else class="flex flex-col justify-center items-center">
            <button
                type="button"
                class="m-8 w-1/4 focus:outline-none font-black hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-400 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                @click="restartQuiz"
            >
                Try Again
            </button>

            <div
                class="results-container mt-8 flex flex-col justify-center items-center"
            >
                <div v-if="correctCards.length > 0" class="m-4">
                    <div>
                        <button
                            type="button"
                            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            @click="toggleCorrectAnswers"
                        >
                            Correct Answers
                            <svg
                                class="-mr-1 h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <!--Toggle Correct Answers-->
                    <div
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        v-show="showCorrectAnswers"
                    >
                        <div
                            v-for="(flashcard, index) in correctCards"
                            :key="flashcard.id"
                            class="m-5 flex flex-col flex-wrap justify-center items-center"
                        >
                            <div
                                class="w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
                            >
                                <p
                                    class="text-slate-200 flex justify-end mt-3 mr-3"
                                >
                                    POINTS: {{ flashcard.points }}
                                </p>
                                <div class="w-full h-full p-4">
                                    <h3
                                        class="flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"
                                    >
                                        {{ flashcard.question }}
                                    </h3>
                                </div>
                            </div>
                            <div class="answers-container">
                                <div>
                                    <ul
                                        class="flex flex-col justify-between items-center gap-3 mt-5"
                                    >
                                        <li
                                            class="w-[500px] p-11 text-gray-800 border border-green-200 rounded-lg shadow dark:bg-green-400 dark:border-green-400 mb-2"
                                        >
                                            {{ flashcard.answer }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!---Toggle Incorrect Answers-->
                <div v-if="incorrectCards.length > 0" class="m-4">
                    <div>
                        <button
                            type="button"
                            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            @click="toggleIncorrectAnswers"
                        >
                            Incorrect Answers
                            <svg
                                class="-mr-1 h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        v-show="showIncorrectAnswers"
                    >
                        <div
                            v-for="(flashcard, index) in incorrectCards"
                            :key="flashcard.id"
                            class="m-5 flex flex-col flex-wrap justify-center items-center"
                        >
                            <div
                                class="w-[700px] h-[300px] border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
                            >
                                <p
                                    class="text-slate-200 flex justify-end mt-3 mr-3"
                                >
                                    POINTS: {{ flashcard.card.points }}
                                </p>
                                <div class="w-full h-full p-4">
                                    <h3
                                        class="flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center text-slate-200"
                                    >
                                        {{ flashcard.card.question }}
                                    </h3>
                                </div>
                            </div>
                            <div class="answers-container">
                                <div>
                                    <ul
                                        class="flex flex-col justify-between items-center gap-3 mt-5"
                                    >
                                        <li
                                            class="w-[500px] p-11 text-gray-800 border border-red-200 rounded-lg shadow dark:bg-red-400 dark:border-red-400 mb-2"
                                        >
                                            {{ flashcard.userAnswer }}
                                        </li>
                                        <li
                                            class="w-[500px] p-11 text-gray-800 border border-green-200 rounded-lg shadow dark:bg-green-400 dark:border-green-400 mb-2"
                                        >
                                            {{ flashcard.card.answer }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
