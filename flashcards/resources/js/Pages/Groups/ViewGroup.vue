<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, usePage, useForm, router } from "@inertiajs/vue3";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ref, computed, watch } from "vue";
import SuccessToast from "@/Components/SuccessToast.vue";
import ErrorToast from "@/Components/ErrorToast.vue";
import AddDeckModal from "@/Components/AddDeckModal.vue";
import DeleteModal from "@/Components/DeleteModal.vue";
import DeleteGroupModal from "@/Components/DeleteModal.vue";
import RemoveDeckModal from "@/Components/DeleteModal.vue";
import SearchBar from "@/Components/SearchBar.vue";
import NewPagination from "@/Components/NewPagination.vue";

const { group, userDecks } = defineProps({
    group: Object,
    userDecks: Object,
});

dayjs.extend(relativeTime);

const page = usePage();
const currentDeck = ref();
const showEditTitle = ref(false);
const addDeckModal = ref(false);
const deleteKeepDecksModal = ref(false);
const deleteGroupModal = ref(false);
const removeDeckModal = ref(false);
const searchInput = ref("");

const fetchDecks = (url) => {
    router.visit(url, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
};

const form = useForm({
    title: group.title,
});

const handleSearch = (input) => {
    searchInput.value = input.trim();
};

const searchResults = computed(() => {
    return userDecks.data.filter((item) => {
        return item.title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
    });
});

const showEditTitleModal = () => {
    showEditTitle.value = !showEditTitle.value;
    form.clearErrors();
    form.reset();
};

const editTitle = async () => {
    try {
        await form.patch(route("group.updateTitle", { group: group.id }), {
            onSuccess: () => {
                showEditTitle.value = false;
            },
        });
    } catch (error) {
        page.props.flash.error = `Unable to update card. Error: ${error}`;
    }
};

const showAddDeck = () => {
    addDeckModal.value = !addDeckModal.value;
};

const showKeepDecks = () => {
    deleteKeepDecksModal.value = !deleteKeepDecksModal.value;
};

const deleteKeepDecks = async () => {
    try {
        await router.delete(route("group.keepDecks", { group: group.id }));
    } catch (error) {
        page.props.flash.error = `Unable to delete group and keep decks. Error: ${error}`;
    }
};

const showDeleteGroup = () => {
    deleteGroupModal.value = !deleteGroupModal.value;
};

const deleteAll = async () => {
    try {
        await router.delete(route("group.destroy", { group: group.id }));
    } catch (error) {
        page.props.flash.error = `Unable to delete group. Error: ${error}`;
    }
};

const showRemoveDeck = (deck) => {
    removeDeckModal.value = !removeDeckModal.value;
    currentDeck.value = deck;
};

const removeDeck = async () => {
    try {
        await router.patch(
            route("group.removeDeck", { deck: currentDeck.value })
        );
        page.props.flash.success = null;
    } catch (error) {
        page.props.flash.error = `Unable to remove deck. Error: ${error}`;
    }
};
</script>

<template>
    <Head :title="group.title" />
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
                            {{ group.title }}
                        </h2>
                        <div @click.stop="showEditTitleModal">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                class="w-5 h-5 cursor-pointer"
                            >
                                <path
                                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                                />
                                <path
                                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                                />
                            </svg>
                        </div>
                    </div>

                    <!-- Edit Title Modal -->
                    <div v-if="showEditTitle" class="absolute mt-5">
                        <div class="relative mt-2 z-10">
                            <!-- Modal content -->
                            <div
                                class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                                <!-- Modal header -->
                                <div
                                    class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                                >
                                    <h3
                                        class="text-lg font-semibold text-gray-900 dark:text-white"
                                    >
                                        Edit Group Title :
                                    </h3>
                                    <button
                                        @click.stop="showEditTitleModal"
                                        type="button"
                                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            class="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <!-- Modal body -->
                                <form
                                    class="p-4 md:p-5"
                                    @submit.prevent="editTitle"
                                >
                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                        <div class="col-span-2">
                                            <label
                                                for="title"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >{{ group.title }}</label
                                            >
                                            <input
                                                type="text"
                                                class="mb-2 w-full text-black"
                                                v-model="form.title"
                                            />
                                            <div
                                                v-if="form.errors.title"
                                                class="text-red-300 font-bold mt-1"
                                            >
                                                {{ form.errors.title }}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        :disabled="form.processing"
                                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:w-80">
                    <SearchBar
                        @search="handleSearch"
                        :value="searchInput.value"
                    />
                </div>

                <div class="flex flex-row justify-evenly items-center">
                    <Link
                        :href="route('group.showAddDeck', { group: group.id })"
                        as="button"
                        class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-2 py-1 md:mt-0 md:px-5 md:py-2.5 me-2 mt-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
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

                        Add Deck</Link
                    >
                    <div class="flex flex-row justify-evenly items-center">
                        <button
                            class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-2 py-1 md:mt-0 md:px-5 md:py-2.5 me-2 mt-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            @click.stop="showKeepDecks"
                        >
                            Delete Group Only
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-row justify-evenly items-center">
                        <button
                            class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-2 py-1 md:mt-0 md:px-5 md:py-2.5 me-2 mt-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            @click.stop="showDeleteGroup"
                        >
                            Delete All
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </template>

        <!-- Delete Group Keep Decks Modal-->
        <DeleteModal
            :show="deleteKeepDecksModal"
            @close="showKeepDecks"
            :deleteFunction="deleteKeepDecks"
            :message="`Are you sure you want to delete only the group?`"
        />

        <!-- Delete Group Modal-->
        <DeleteGroupModal
            :show="deleteGroupModal"
            @close="showDeleteGroup"
            :deleteFunction="deleteAll"
            :message="`Are you sure you want to delete this group and all decks?`"
        />

        <!-- Delete Card Modal-->
        <RemoveDeckModal
            :show="removeDeckModal"
            @close="showRemoveDeck"
            :deleteFunction="removeDeck"
            :message="`Are you sure you want to remove this deck?`"
        />

        <SuccessToast
            v-if="$page.props.flash.success"
            :message="$page.props.flash.success"
        />
        <ErrorToast
            v-if="$page.props.flash.error"
            :message="$page.props.flash.error"
        />

        <div class="mt-6 flex flex-wrap justify-center items-center">
            <!-- Search Results -->
            <div
                v-if="searchInput && searchResults.length > 0"
                class="flex flex-col flex-wrap justify-center items-center gap-4"
            >
                <div
                    class="flex flex-row flex-wrap justify-center items-center gap-4"
                >
                    <div
                        v-for="deck in searchResults"
                        :key="deck.id"
                        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
                    >
                        <div class="flex flex-row justify-between">
                            <span class="dark:text-white"
                                >Created:
                                {{ dayjs(deck.created_at).fromNow() }}</span
                            >
                            <button @click.stop="showRemoveDeck(deck.id)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="red"
                                    class="w-6 h-6"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
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
                            >Last Viewed:
                            {{ dayjs(deck.lastviewed).fromNow() }}</span
                        >
                        <span class="text-right dark:text-white" v-else
                            >Not Viewed</span
                        >
                    </div>
                </div>
                <!-- Pagination Links -->
                <NewPagination
                    :links="userDecks.links"
                    @navigate="fetchDecks"
                ></NewPagination>
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
                v-if="!searchInput && userDecks.data.length > 0"
                class="flex flex-col flex-wrap justify-center items-center gap-4"
            >
                <div
                    class="flex flex-row flex-wrap justify-center items-center gap-4"
                >
                    <div
                        v-for="deck in userDecks.data"
                        :key="deck.id"
                        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between"
                    >
                        <div class="flex flex-row justify-between">
                            <span class="dark:text-white"
                                >Created:
                                {{ dayjs(deck.created_at).fromNow() }}</span
                            >
                            <button @click.stop="showRemoveDeck(deck.id)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="red"
                                    class="w-6 h-6"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
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
                            >Last Viewed:
                            {{ dayjs(deck.lastviewed).fromNow() }}</span
                        >
                        <span class="text-right dark:text-white" v-else
                            >Not Viewed</span
                        >
                    </div>
                </div>
                <!-- Pagination Links -->
                <NewPagination
                    :links="userDecks.links"
                    @navigate="fetchDecks"
                    :from="userDecks.from"
                    :to="userDecks.to"
                    :total="userDecks.total"
                />
            </div>

            <!-- Empty Group Add Decks-->
            <div
                v-if="
                    !searchInput &&
                    searchResults.length === 0 &&
                    userDecks.data.length === 0
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
                    Add Decks To Your Group To Get Started!
                </p>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
