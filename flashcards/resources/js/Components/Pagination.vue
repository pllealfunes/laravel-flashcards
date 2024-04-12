<script setup>
import { ref, computed } from "vue";
const pageSize = 10;
const currentPage = ref(1);

const { results } = defineProps(["results"]);
console.log(results);

const paginateDeck = () => {
    const startIndex = (currentPage.value - 1) * pageSize;
    return results.slice(startIndex, startIndex + pageSize);
};

const onPageChange = (page) => {
    currentPage.value = page;
};

const totalPages = computed(() => Math.ceil(results.length / pageSize));
</script>

<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="flex items-center -space-x-px h-10 text-base">
                <li>
                    <a
                        href="#"
                        class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <button
                            @click="onPageChange(currentPage - 1)"
                            :disabled="currentPage === 1"
                            :class="{
                                'text-white': currentPage !== 1,
                                'cursor-not-allowed': currentPage === 1,
                            }"
                        >
                            Previous
                        </button>
                        <svg
                            class="w-3 h-3 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </a>
                </li>
                <template v-for="page in Math.min(totalPages, 10)" :key="page">
                    <li
                        @click="onPageChange(page)"
                        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        :class="{ 'bg-yellow-800': currentPage === page }"
                    >
                        <button>{{ page }}</button>
                    </li>
                </template>
                <li>
                    <a
                        href="#"
                        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <button
                            @click="onPageChange(currentPage + 1)"
                            :disabled="currentPage === totalPages"
                            :class="{
                                'text-white': currentPage !== totalPages,
                                'cursor-not-allowed':
                                    currentPage === totalPages,
                            }"
                        >
                            Next
                        </button>
                        <svg
                            class="w-3 h-3 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
