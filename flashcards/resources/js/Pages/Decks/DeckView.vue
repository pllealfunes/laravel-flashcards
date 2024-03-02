<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
const { deck } = defineProps(["deck"]);

// Create an array to store the flipped state for each card
const flippedStates = ref(new Array(deck.cards.length).fill(false));
const activeCardIndex = ref(0); // Keep track of the index of the currently active card
const isActive = ref(false);

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
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ deck.title }}
            </h2>
        </template>
        <div class="flex flex-col">
            <div
                v-for="(card, index) in deck.cards"
                :key="card.id"
                v-show="index === activeCardIndex"
                class="m-5 font-semibold absolute inset-x-0 flex flex-wrap justify-center items-center transition-transform duration-500 ease-in-out"
            >
                <div
                    class="w-[700px] h-[450px] dark:text-slate-200 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between cursor-pointer group perspective relative preserve-3d duration-1000"
                    :class="{
                        'flip-card': flippedStates[index],
                    }"
                    @click="toggleFlip(index)"
                >
                    <div class="backface-hidden w-full h-full p-4">
                        <p>{{ card.hint }}</p>
                        <h3
                            class="text-center flex flex-col items-center justify-center h-full px-2 pb-24 text-3xl font-semibold text-center"
                        >
                            {{ card.question }}
                        </h3>
                    </div>

                    <p>{{ deck.question }}</p>
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
        </div>
    </AuthenticatedLayout>
    <div class="inline-flex">
        <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            @click="showPrevCard"
            :disabled="isPrevButtonDisabled"
            :class="{ visible: isActive, hidden: !isActive }"
        >
            Prev
        </button>
        <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            @click="showNextCard"
        >
            Next
        </button>
    </div>
</template>
