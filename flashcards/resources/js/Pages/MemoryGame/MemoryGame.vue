<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
const { deck, flashcards } = defineProps(["deck", "flashcards"]);

const answersArray = ref([]);
const questionsArray = ref([]);
const cardColor = ref(null);
const pickedCards = ref([]);

answersArray.value = flashcards.map(function (flashcard) {
    return { type: "answer", value: flashcard.answer };
});

questionsArray.value = flashcards.map(function (flashcard) {
    return { type: "question", value: flashcard.question };
});

const currentCards = ref([...answersArray.value, ...questionsArray.value]);

const flippedStates = ref(
    currentCards.value.map(() => ({
        flipped: false,
        color: "dark:bg-sky-950",
    }))
);

const toggleFlip = (index, type) => {
    // Update the flipped state of the clicked card
    flippedStates.value[index].flipped = !flippedStates.value[index].flipped;
    pickedCard(index, type);
};

function pickedCard(index, type) {
    if (pickedCards.value.length < 2) {
        pickedCards.value.push({ index, type });
        console.log(pickedCards.value);
    }

    if (pickedCards.value.length === 2) {
        compareCards();
    }
}

function compareCards() {
    const [firstCard, secondCard] = pickedCards.value;

    if (firstCard.type === secondCard.type) {
        console.log("Please select one question and one answer.");
        // Clear selected cards for next round
        pickedCards.value = [];

        flippedStates.value[firstCard.index].color = "bg-red-500";
        flippedStates.value[secondCard.index].color = "bg-red-500";
        setTimeout(function () {
            flippedStates.value[firstCard.index].flipped =
                !flippedStates.value[firstCard.index].flipped;
            flippedStates.value[secondCard.index].flipped =
                !flippedStates.value[secondCard.index].flipped;
            flippedStates.value[firstCard.index].color = "bg-sky-950";
            flippedStates.value[secondCard.index].color = "bg-sky-950";
        }, 3000);

        return;
    }

    const questionCard = firstCard.type === "question" ? firstCard : secondCard;
    const answerCard = firstCard.type === "answer" ? firstCard : secondCard;

    const question = flashcards.find(
        (card) => card.question === currentCards.value[questionCard.index].value
    );
    const answer = answersArray.value[answerCard.index];
    console.log(questionCard);
    console.log(questionCard.index);
    console.log(question);
    console.log(answer);

    if (question.answer === answer.value) {
        console.log("this answer is correct");
        flippedStates.value[firstCard.index].color = "bg-green-500";
        flippedStates.value[secondCard.index].color = "bg-green-500";
    } else {
        console.log("no match");

        flippedStates.value[firstCard.index].color = "bg-red-500";
        flippedStates.value[secondCard.index].color = "bg-red-500";
    }
    // Clear selected cards for next round
    pickedCards.value = [];

    setTimeout(function () {
        flippedStates.value[firstCard.index].flipped =
            !flippedStates.value[firstCard.index].flipped;
        flippedStates.value[secondCard.index].flipped =
            !flippedStates.value[secondCard.index].flipped;
        flippedStates.value[firstCard.index].color = "bg-sky-950";
        flippedStates.value[secondCard.index].color = "bg-sky-950";
    }, 3000);
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
            >
                New Game
            </button>
            <div>
                Studied: {{ currentCards.length / 2 }} /
                {{ flashcards.length }} Flashcards
            </div>
        </div>
        <section
            class="grid md:grid-cols-2 lg:grid-cols-4 gap-1"
            id="flashcardsDeck"
        >
            <div
                v-for="(card, index) in currentCards"
                :key="card.id"
                class="m-5 font-semibold flex flex-row justify-center items-center transition-transform duration-500 ease-in-out"
            >
                <div
                    class="w-[350px] h-[250px] dark:text-slate-200 border border-gray-200 rounded-lg shadow dark:border-sky-950 mb-2 flex flex-row justify-between cursor-pointer group perspective relative preserve-3d duration-1000"
                    :class="[
                        { 'flip-card': flippedStates[index].flipped },
                        flippedStates[index].color,
                    ]"
                    @click.stop="toggleFlip(index, card.type)"
                >
                    <div
                        class="flip-card backface-hidden w-full h-full dark:border-sky-950 rounded-lg"
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
