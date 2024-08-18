<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { router, useForm, usePage, Head } from "@inertiajs/vue3";
import SuccessToast from "@/Components/SuccessToast.vue";
import ErrorToast from "@/Components/ErrorToast.vue";
import AddDeckModal from "@/Components/AddDeckModal.vue";
import NewPagination from "@/Components/NewPagination.vue";
import SearchBar from "@/Components/SearchBar.vue";

const props = defineProps({
    availableDecks: Object,
    groupId: String,
});

const page = usePage();
const addDeckModal = ref(false);
const searchInput = ref("");

const fetchDecks = (url) => {
    router.visit(url, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
};

const handleSearch = (input) => {
    searchInput.value = input.trim();
};

const searchResults = computed(() => {
    return props.availableDecks.data.filter((deck) => {
        return deck.title
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

const checkedDecks = ref([]);

const form = useForm({
    decks: [],
});

const showAddDeck = () => {
    addDeckModal.value = !addDeckModal.value;
};

const addDeck = async () => {
    try {
        form.decks = checkedDecks;
        await form.put(
            route("group.addDeck", { group: Number(props.groupId) }),
            {
                preserveState: (page) =>
                    Object.keys(page.props.errors).length > 0,
            },
            {
                onSuccess: () => form.reset(),
            }
        );
    } catch (error) {
        page.props.flash.error = `Unable to add new Deck to Group. Error: ${error}`;
    }
};
</script>
<template>
    <Head>
        <title>Add Decks To Your Group</title>
    </Head>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-row flex-wrap justify-between items-center">
                <div class="flex flex-col">
                    <div
                        class="flex flex-row justify-center items-center gap-2"
                    >
                        <h2
                            class="font-semibold text-xl text-gray-800 leading-tight"
                        >
                            Add Decks To Your Group
                        </h2>
                    </div>
                </div>

                <div class="md:w-80">
                    <SearchBar
                        @search="handleSearch"
                        :value="searchInput.value"
                    />
                </div>

                <div class="flex flex-row justify-evenly items-center">
                    <button
                        data-testid="add-card-submit"
                        class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-purple-700 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-700 dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                        @click.stop="showAddDeck"
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
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>

                        Add Decks
                    </button>
                </div>
            </div>
        </template>
        <!-- Confirm Add Deck Modal-->
        <AddDeckModal
            :show="addDeckModal"
            @close="showAddDeck"
            :addFunction="addDeck"
            :message="`Are you sure you want to add the following decks?`"
        />

        <SuccessToast
            v-if="$page.props.flash.success"
            :message="$page.props.flash.success"
        />
        <ErrorToast
            v-if="$page.props.flash.error"
            :message="$page.props.flash.error"
        />

        <!-- Decks List section -->
        <section id="flashcardsList" class="m-auto md:w-1/2 mt-10 p-5 md:p-10">
            <div class="overflow-x-auto shadow-md rounded-lg mb-10">
                <!-- Display All Cards Matching Search-->
                <div v-if="searchInput && searchResults.length > 0">
                    <form @submit.prevent="submit">
                        <table
                            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                            <thead
                                class="text-gray-700 uppercase bg-gray-800 dark:bg-gray-800 text-slate-50"
                            >
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Deck Title
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-right"
                                    >
                                        Available Decks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="deck in searchResults"
                                    :key="deck.id"
                                    class="border-b border-gray-200 dark:border-gray-700 text-black"
                                >
                                    <td class="px-6 py-4">
                                        {{ deck.title }}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <label
                                            :for="'checkbox-' + deck.id"
                                            class="text-black"
                                        >
                                            <input
                                                type="checkbox"
                                                :id="'checkbox-' + deck.id"
                                                v-model="checkedDecks"
                                                :value="deck.id"
                                            />
                                            Add to Group
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Pagination Links -->
                        <div class="flex justify-center items-center">
                            <NewPagination
                                :links="props.availableDecks.links"
                                @navigate="fetchDecks"
                                :from="paginationProperties.from"
                                :to="paginationProperties.to"
                                :total="paginationProperties.total"
                            />
                        </div>
                    </form>
                </div>

                <!-- Display All Cards-->
                <div
                    v-if="!searchInput && props.availableDecks.data.length > 0"
                >
                    <form @submit.prevent="submit">
                        <table class="w-full text-sm text-left rtl:text-right">
                            <thead
                                class="text-gray-700 uppercase bg-gray-800 dark:bg-gray-800 text-slate-50"
                            >
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Deck Title
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-right"
                                    >
                                        Available Decks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="deck in props.availableDecks.data"
                                    :key="deck.id"
                                    class="border-b border-gray-200 dark:border-gray-700 text-black"
                                >
                                    <td class="px-6 py-4">
                                        {{ deck.title }}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <label
                                            :for="'checkbox-' + deck.id"
                                            class="text-black"
                                        >
                                            <input
                                                data-testid="checkbox-deck-add"
                                                type="checkbox"
                                                :id="'checkbox-' + deck.id"
                                                v-model="checkedDecks"
                                                :value="deck.id"
                                            />
                                            Add to Group
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Pagination Links -->
                        <div class="flex justify-center items-center">
                            <NewPagination
                                :links="props.availableDecks.links"
                                @navigate="fetchDecks"
                                :from="props.availableDecks.from"
                                :to="props.availableDecks.to"
                                :total="props.availableDecks.total"
                            />
                        </div>
                    </form>
                </div>
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
                <p class="mt-4 text-2xl font-bold">
                    No matching Results for "{{ searchInput }}"
                </p>
            </div>

            <!-- No Available Decks to Add -->
            <div
                v-if="
                    !searchInput &&
                    searchResults.length === 0 &&
                    props.availableDecks.data.length === 0
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
                    No Available Decks to Add
                </p>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
