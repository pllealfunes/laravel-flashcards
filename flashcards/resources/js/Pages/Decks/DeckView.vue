<script setup>
import { onMounted } from "vue";
const props = defineProps(["deck"]);
</script>

<template>
    <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
    >
        {{ props.deck.id }}
    </div>
</template>
