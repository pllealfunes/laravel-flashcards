<script setup>
import { Head } from "@inertiajs/vue3";
const props = defineProps(["deck"]);
</script>

<template>
    <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
    >
        {{ props.deck.id }}
    </div>
    <div
        class="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000"
    >
        <div class="absolute backface-hidden border-2 w-full h-full">
            <span>{{ props.deck.cards[0].question }}</span>
        </div>
        <div
            class="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100 overflow-hidden"
        >
            <div
                class="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24"
            >
                <h1 class="text-3xl font-semibold">
                    {{ props.deck.cards[0].answer }}
                </h1>
                <p class="my-2">{{ props.deck.cards[0].points }}</p>
                <p class="my-2">{{ props.deck.cards[0].difficultylevel }}</p>
                <p>
                    {{ props.deck.cards[0].hint }}
                </p>
            </div>
        </div>
    </div>
</template>
