<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "@inertiajs/vue3";

const { deck } = defineProps(["deck"]);
dayjs.extend(relativeTime);
</script>

<template>
    <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
    >
        <div class="flex flex-row justify-between">
            <span class="dark:text-white"
                >Created: {{ dayjs(deck.created_at).fromNow() }}</span
            >
            <span class="dark:text-white">{{ deck.cards.length }} Cards</span>
        </div>

        <Link
            :href="route('deck.show', { deck: deck.id })"
            :data="{ lastviewed: new Date() }"
            as="button"
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200"
            >{{ deck.id }}</Link
        >
        <span
            class="text-right text-gray-900 dark:text-slate-200"
            v-if="deck.lastviewed !== null"
            >Last Viewed: {{ dayjs(deck.lastviewed).fromNow() }}</span
        >
        <span class="text-right dark:text-white" v-else>Not Viewed</span>
    </div>
</template>
