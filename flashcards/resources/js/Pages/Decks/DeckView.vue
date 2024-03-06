<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
const { deck } = defineProps(["deck"]);

// Create an array to store the flipped state for each card
const flippedStates = ref(new Array(deck.cards.length).fill(false));
const activeCardIndex = ref(0); // Keep track of the index of the currently active card
const isActive = ref(false);
const showHint = ref(false);

const toggleFlip = (index) => {
    // Update the flipped state of the clicked card
    flippedStates.value[index] = !flippedStates.value[index];
};

const showNextCard = () => {
    // Hide the currently active card
    flippedStates.value[activeCardIndex.value] = false;
    // Update activeCardIndex to point to the next card
    activeCardIndex.value = (activeCardIndex.value + 1) % deck.cards.length;
    isActive.value = activeCardIndex.value !== 0;
};

const showPrevCard = () => {
    // Hide the currently active card
    flippedStates.value[activeCardIndex.value] = false;
    // Update activeCardIndex to point to the next card
    activeCardIndex.value = (activeCardIndex.value - 1) % deck.cards.length;
    isActive.value = activeCardIndex.value !== 0;
};

// Computed property to determine if the Prev button should be disabled
const isPrevButtonDisabled = computed(() => activeCardIndex.value === 0);

const hintToggle = () => {
    console.log(showHint.value);
    showHint.value = !showHint.value;
    console.log(showHint.value);
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ deck.title }}
            </h2>
        </template>
        <section class="relative" id="flashcardsDeck">
            <div
                v-for="(card, index) in deck.cards"
                :key="card.id"
                v-show="index === activeCardIndex"
                class="m-5 font-semibold inset-x-0 flex flex-wrap justify-center items-center transition-transform duration-500 ease-in-out"
            >
                <div
                    class="w-[700px] h-[450px] dark:text-slate-200 border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between cursor-pointer group perspective relative preserve-3d duration-1000"
                    :class="{
                        'flip-card': flippedStates[index],
                    }"
                    @click.stop="toggleFlip(index)"
                >
                    <div class="backface-hidden w-full h-full p-4">
                        <button
                            @click.stop="hintToggle"
                            class="rounded-lg dark:bg-yellow-500 p-1 text-sky-950 flex flex-wrap flex-row w-20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <p>Hint</p>
                        </button>
                        <!-- Small Modal -->
                        <div v-if="showHint" @click.stop="hintToggle">
                            <div class="absolute mr-2">
                                <!-- Modal content -->
                                <div
                                    class="relative rounded-lg shadow dark:bg-gray-700"
                                >
                                    <!-- Modal header -->
                                    <div
                                        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                                    >
                                        <h3
                                            class="text-xl font-medium text-gray-900 dark:text-white"
                                        >
                                            Here's a Hint :
                                        </h3>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="p-4 md:p-5 space-y-4">
                                        <p
                                            class="text-base leading-relaxed text-gray-500 dark:text-white"
                                        >
                                            {{ card.hint }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3
                            class="flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center"
                        >
                            {{ card.question }}
                        </h3>
                    </div>

                    <div
                        class="absolute flip-card backface-hidden w-full h-full dark:bg-sky-950 dark:border-sky-950 rounded-lg"
                    >
                        <div
                            class="text-center flex flex-col items-center justify-center h-full px-2 pb-24"
                        >
                            <p>
                                {{ card.answer }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Buttons container -->
        <div class="flex justify-evenly w-full mt-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12"
                @click="showPrevCard"
                :disabled="isPrevButtonDisabled"
                :class="{ notActive: !isActive }"
            >
                <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                    clip-rule="evenodd"
                />
            </svg>
            <span class="text-gray-800 font-bold mt-3 text-xl">
                {{ activeCardIndex + 1 }} / {{ deck.cards.length }}
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12"
                @click="showNextCard"
            >
                <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>

        <!-- Your flashcardsList section -->
        <section id="flashcardsList" class="mt-[300px]">
            <ul
                v-for="card in deck.cards"
                :key="card.id"
                class="flex flex-wrap justify-center items-center"
            >
                <li
                    class="w-[50%] h-[70px] m-5 dark:text-slate-200 border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950"
                >
                    <div class="flex flex-row justify-between p-5">
                        <p>{{ card.question }}</p>
                        <p>{{ card.answer }}</p>
                    </div>
                </li>
            </ul>
        </section>
    </AuthenticatedLayout>
</template>

<style>
.notActive {
    fill: gray;
}

.notActive:hover {
    fill: gray !important;
}
</style>
