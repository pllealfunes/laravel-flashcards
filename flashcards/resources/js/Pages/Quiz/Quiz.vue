<script setup>
import { ref, computed, onMounted } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Link, Head } from "@inertiajs/vue3";

const { deck, flashcards } = defineProps(["deck", "flashcards"]);
//const currentCards = ref([]);
const currentAnswers = ref([]);

const numRandomAnswers = 3;
const currentCards = computed(() => {
    return shuffleDeck([...flashcards]).map((card) => ({
        ...card,
        answers: getRandomAnswers(card),
    }));
});

// Function to check if two cards are the same
const isSameDeck = (card1, card2) => {
    if (card1.length !== card2.length) return false;
    for (let i = 0; i < card1.length; i++) {
        if (card1[i] !== card2[i]) return false;
    }
    return true;
};

// Function to shuffle a deck

const shuffleArray = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

const shuffleDeck = (deck) => {
    for (const card of deck) {
        card.answers = [
            card.answer,
            ...deck.map((c) => c.answer).filter((a) => a !== card.answer),
        ];
        card.answers = shuffleArray(card.answers.map((a) => a.toLowerCase())); // Shuffle lowercase answers
    }
    shuffleArray(deck);
    return deck;
};

const getRandomAnswers = (card) => {
    return shuffleArray([...card.answers.map((a) => a.toLowerCase())]).slice(
        0,
        numRandomAnswers
    ); // Lowercase random answers
};
</script>

<template>
    <Head>
        <title>Quiz: {{ deck.title }}</title>
    </Head>
    <AuthenticatedLayout>
        <h1
            class="mt-6 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"
        >
            Quiz: {{ deck.title }}
        </h1>

        <div class="quiz-container">
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
                                v-for="(answer, aIndex) in flashcard.answers"
                                :key="aIndex"
                            >
                                <label
                                    :for="`answer-${index}-${aIndex}`"
                                    class="text-gray-800"
                                >
                                    <input
                                        type="text"
                                        :id="`answer-${index}-${aIndex}`"
                                        :value="answer"
                                        v-model="currentAnswers[index]"
                                        class="w-[500px] p-11 text-left border border-gray-200 rounded-lg shadow text-gray-800 dark:bg-slate-400 dark:border-slate-400 mb-2 hover:bg-slate-500 hover:text-gray-200 hover:cursorpointer"
                                    />
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
