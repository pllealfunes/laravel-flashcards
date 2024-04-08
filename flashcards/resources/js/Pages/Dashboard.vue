<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import { ref, onMounted, computed } from "vue";
import Index from "@/Pages/Decks/Index.vue";
import SuccessToast from "@/Components/SuccessToast.vue";

const { decks, groups } = defineProps(["decks", "groups"]);
const items = ref([]);
const searchInput = ref("");

onMounted(async () => {
    let currentDecks = decks.filter(
        (deck) => !groups.some((group) => group.id === deck.group_id)
    );

    items.value = [
        ...currentDecks.map((deck) => ({ ...deck, type: "deck" })),
        ...groups.map((group) => ({ ...group, type: "group" })),
    ];
});

const searchResults = computed(() => {
    return items.value.filter((item) => {
        return item.title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
    });
});
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
                <div class="md:w-80">
                    <form class="max-w-lg mx-auto">
                        <label
                            for="default-search"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >Search</label
                        >
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                            >
                                <svg
                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                v-model="searchInput"
                                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>
        </div>
        <SuccessToast
            v-if="$page.props.flash.success"
            :message="$page.props.flash.success"
        />
        <div v-if="searchInput.value !== ''">
            <div
                class="mt-6 flex flex-row flex-wrap justify-center items-center gap-4"
            >
                <Index
                    v-for="item in searchResults"
                    :key="item.id"
                    :item="item"
                />
            </div>
        </div>
        <div v-else>
            <div
                class="mt-6 flex flex-row flex-wrap justify-center items-center gap-4"
            >
                <Index v-for="item in items" :key="item.id" :item="item" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
