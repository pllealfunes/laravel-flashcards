<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm } from "@inertiajs/vue3";

const props = defineProps(["deck"]);
dayjs.extend(relativeTime);
const form = useForm({
    lastviewed: null,
});

const editLastViewed = () => {
    form.put(route("deck.editLastViewed", props.deck.id), {
        lastviewed: new Date(),
        onSuccess: (response) => {
            console.log("success");
            console.log(response);
            //props.deck.lastviewed = response.data.lastviewed;
        },
    });
};
</script>

<template>
    <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
    >
        <div class="flex flex-row justify-between">
            <span class="dark:text-white"
                >Created: {{ dayjs(props.deck.created_at).fromNow() }}</span
            >
            <span class="dark:text-white"
                >{{ props.deck.cards.length }} Cards</span
            >
        </div>
        <form @submit.prevent="editLastViewed" class="m-auto">
            <button
                type="submit"
                name="submit"
                :disabled="form.processing"
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {{ props.deck.title }}
            </button>
        </form>
        <span
            class="text-right dark:text-white"
            v-if="`${props.deck.lastviewed}`"
            >Last Viewed: {{ props.deck.lastviewed }}</span
        >
    </div>
</template>
