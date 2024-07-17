<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import { ref, onMounted, computed } from "vue";
import Index from "@/Pages/Decks/Index.vue";
import SuccessToast from "@/Components/SuccessToast.vue";
import SearchBar from "@/Components/SearchBar.vue";
import SearchPagination from "@/Components/Pagination.vue";
import UsersPagination from "@/Components/Pagination.vue";

const { decks, groups } = defineProps({
    decks: Array,
    groups: Array,
});

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

const handleSearch = (input) => {
    searchInput.value = input;
};

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
                    <SearchBar @search="handleSearch" />
                </div>
            </div>
        </template>

        <SuccessToast
            v-if="$page.props.flash.success"
            :message="$page.props.flash.success"
        />

        <div
            v-if="searchInput"
            class="flex flex-wrap justify-center items-center gap-4"
        >
            <div>
                <Index
                    v-for="item in searchResults"
                    :key="item.id"
                    :item="item"
                />
                <UsersPagination
                    v-if="searchResults.length > 10"
                    :results="searchResults"
                    class="mt-5"
                />
            </div>
        </div>

        <div v-else class="flex flex-wrap justify-center items-center gap-4">
            <Index v-for="item in items" :key="item.id" :item="item" />
            <SearchPagination
                v-if="items.length > 10"
                results="items"
                class="mt-5"
            />
        </div>
    </AuthenticatedLayout>
</template>
