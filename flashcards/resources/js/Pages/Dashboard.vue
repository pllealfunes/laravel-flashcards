<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import { ref, onMounted, computed } from "vue";
import Index from "@/Pages/Decks/Index.vue";
import SuccessToast from "@/Components/SuccessToast.vue";
import SearchBar from "@/Components/SearchBar.vue";
import SearchPagination from "@/Components/Pagination.vue";
import UsersPagination from "@/Components/Pagination.vue";
import NewPagination from "@/Components/NewPagination.vue";

const { deckGroupItems } = defineProps({
    deckGroupItems: Object,
});

const searchInput = ref("");

const fetchDecks = (url) => {
    router.visit(url, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
};

const handleSearch = (input) => {
    searchInput.value = input;
};

const searchResults = computed(() => {
    return deckGroupItems.data.filter((item) => {
        return item.title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
    });
});

const paginationProperties = computed(() => {
    const from = 1;
    const to = searchResults.value.length;
    const total = searchResults.value.length;

    return { from, to, total };
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
                    <SearchBar
                        @search="handleSearch"
                        :value="searchInput.value"
                    />
                </div>
            </div>
        </template>

        <SuccessToast
            v-if="$page.props.flash.success"
            :message="$page.props.flash.success"
        />

        <div
            v-if="searchInput && searchResults.length > 0"
            class="flex flex-wrap flex-col justify-center items-center gap-4"
        >
            <div class="flex flex-wrap justify-center items-center gap-4">
                <Index
                    v-for="result in searchResults"
                    :key="result.id"
                    :result="result"
                />
            </div>
            <!-- Pagination Links -->
            <NewPagination
                :links="deckGroupItems.links"
                @navigate="fetchDecks"
                :from="paginationProperties.from"
                :to="paginationProperties.to"
                :total="paginationProperties.total"
            />
        </div>

        <!-- Search but No Search Results-->
        <div
            v-if="searchInput && searchResults.length === 0"
            class="flex flex-col justify-center items-center mt-36"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="purple"
                class="size-40"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
            </svg>

            <p class="mt-11 text-2xl font-bold">
                No matching Results for "{{ searchInput }}"
            </p>
        </div>

        <!-- All Decks (when no search input) -->
        <div
            v-if="!searchInput && deckGroupItems.data.length > 0"
            class="flex flex-wrap flex-col justify-center items-center gap-4"
        >
            <div class="flex flex-wrap justify-center items-center gap-4">
                <Index
                    v-for="result in deckGroupItems.data"
                    :key="result.id"
                    :result="result"
                />
            </div>
            <!-- Pagination Links -->
            <NewPagination
                :links="deckGroupItems.links"
                @navigate="fetchDecks"
                :from="deckGroupItems.from"
                :to="deckGroupItems.to"
                :total="deckGroupItems.total"
            />
        </div>

        <!-- Empty Group Add Decks-->
        <div
            v-if="
                !searchInput &&
                searchResults.length === 0 &&
                deckGroupItems.data.length === 0
            "
            class="flex flex-col justify-center items-center mt-36"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="purple"
                class="size-40"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
            </svg>

            <p class="mt-11 text-2xl font-bold">
                Create Decks and Groups To Get Start Studying!
            </p>
        </div>
    </AuthenticatedLayout>
</template>
