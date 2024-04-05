<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, router } from "@inertiajs/vue3";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ref, onMounted } from "vue";

const { group, decks } = defineProps(["group", "decks"]);
dayjs.extend(relativeTime);
</script>

<template>
    <Head :title="group.title" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ group.title }}
            </h2>
        </template>
        <div
            class="mt-6 flex flex-row flex-wrap justify-center items-center gap-4"
        >
            <div
                v-for="deck in decks"
                :key="deck.id"
                class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
            >
                <div class="flex flex-row justify-between">
                    <span class="dark:text-white"
                        >Created: {{ dayjs(deck.created_at).fromNow() }}</span
                    >
                </div>

                <Link
                    :href="route('deck.show', { deck: deck.id })"
                    as="button"
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >{{ deck.title }}</Link
                >
                <span
                    class="text-right text-gray-900 dark:text-slate-200"
                    v-if="deck.lastviewed !== null"
                    >Last Viewed: {{ dayjs(deck.lastviewed).fromNow() }}</span
                >
                <span class="text-right dark:text-white" v-else
                    >Not Viewed</span
                >
            </div>
        </div>
    </AuthenticatedLayout>
</template>
