<script setup>
import { ref } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
const { deck } = defineProps(["deck"]);

// Create an array to store the flipped state for each card
const flippedStates = ref(new Array(deck.cards.length).fill(false));

const toggleFlip = (index) => {
    // Update the flipped state of the clicked card
    flippedStates.value[index] = !flippedStates.value[index];
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ deck.title }}
            </h2>
        </template>
        <div
            v-for="(card, index) in deck.cards"
            :key="card.id"
            class="font-semibold mt-6 flex flex-row flex-wrap justify-center items-center gap-4"
        >
            <div
                class="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective"
            >
                <div
                    class="relative preserve-3d w-full h-full duration-1000"
                    :class="{ 'flip-card': flippedStates[index] }"
                    @click="toggleFlip(index)"
                >
                    <div
                        class="absolute backface-hidden border-2 w-full h-full"
                    >
                        <h3 class="text-3xl font-semibold">
                            {{ card.answer }}
                        </h3>
                    </div>
                    <div
                        class="absolute flip-card backface-hidden w-full h-full bg-gray-100 overflow-hidden"
                    >
                        <div
                            class="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24"
                        >
                            <p>
                                {{ card.question }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
