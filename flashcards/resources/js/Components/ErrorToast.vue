<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["message"]);
const isVisible = ref(true);

// Automatically hide the toast after 5 seconds
onMounted(() => {
    setTimeout(() => {
        isVisible.value = false;
    }, 3000);
});
</script>

<template>
    <div
        v-if="isVisible"
        class="bg-red-400 text-black font-bold p-3 border-red-600 border-2 border-solid flex flex-row gap-2 justify-center items-center"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
        </svg>

        {{ props.message }}
    </div>
</template>
