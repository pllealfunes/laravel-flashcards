<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({ result: Object });

const resultRoute = computed(() => {
    if (props.result.type === "deck") {
        return route("deck.show", { deck: props.result.id });
    } else if (props.result.type === "group") {
        return route("group.show", { group: props.result.id });
    } else {
        return "#"; // Default to a hash if the item type is unknown
    }
});

dayjs.extend(relativeTime);
</script>

<template>
    <div
        class="mt-6 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
    >
        <div class="flex flex-row justify-between">
            <span class="dark:text-white"
                >Created: {{ dayjs(props.result.created_at).fromNow() }}</span
            >
        </div>

        <Link
            :data-testid="
                props.result.type === 'deck' ? 'deck-title' : 'group-title'
            "
            :href="resultRoute"
            as="button"
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >{{ props.result.title }}</Link
        >
        <span
            class="text-right text-gray-900 dark:text-slate-200"
            v-if="props.result.lastviewed !== null"
            >Last Viewed: {{ dayjs(props.result.lastviewed).fromNow() }}</span
        >
        <span class="text-right dark:text-white" v-else>Not Viewed</span>
    </div>
</template>
