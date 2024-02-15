<script setup>
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

defineProps(["deck"]);
</script>

<template>
    <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
    >
        <div class="text-right dark:text-white">
            <span>{{ deck.cards.length }} Cards</span>
        </div>
        <a href="#" class="mx-auto">
            <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {{ deck.title }}
            </h5>
        </a>
        <div class="text-left dark:text-white">
            <span class="text-left"
                >Created: {{ dayjs(deck.created_at).fromNow() }}</span
            >
        </div>
    </div>
</template>
