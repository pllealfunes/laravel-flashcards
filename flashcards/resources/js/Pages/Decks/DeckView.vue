<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { router, useForm } from "@inertiajs/vue3";
const { deck } = defineProps(["deck"]);

const form = useForm({
    title: deck.title,
});

// Create an array to store the flipped state for each card
const flippedStates = ref(new Array(deck.cards.length).fill(false));
const activeCardIndex = ref(0); // Keep track of the index of the currently active card
const isActive = ref(false);
const showHint = ref(false);
const showEditTitle = ref(false);

const pageSize = 10;
const currentPage = ref(1);

const toggleFlip = (index) => {
    // Update the flipped state of the clicked card
    flippedStates.value[index] = !flippedStates.value[index];
};

const showNextCard = () => {
    // Hide the currently active card
    flippedStates.value[activeCardIndex.value] = false;
    // Update activeCardIndex to point to the next card
    activeCardIndex.value = (activeCardIndex.value + 1) % deck.cards.length;
    isActive.value = activeCardIndex.value !== 0;
};

const showPrevCard = () => {
    // Hide the currently active card
    flippedStates.value[activeCardIndex.value] = false;
    // Update activeCardIndex to point to the next card
    activeCardIndex.value = (activeCardIndex.value - 1) % deck.cards.length;
    isActive.value = activeCardIndex.value !== 0;
};

// Computed property to determine if the Prev button should be disabled
const isPrevButtonDisabled = computed(() => activeCardIndex.value === 0);

const hintToggle = () => {
    showHint.value = !showHint.value;
};

const showEditTitleModal = () => {
    showEditTitle.value = !showEditTitle.value;
    if (form.errors() > 0) {
        form.reset();
        form.clearErrors();
    }
};

const shuffleCards = () => {
    const originalDeck = [...deck.cards]; // Create a copy of the original deck
    let shuffledDeck = shuffleDeck([...originalDeck]); // Initialize shuffled deck

    // Shuffle the deck until it's different from the original
    while (isSameDeck(originalDeck, shuffledDeck)) {
        shuffledDeck = shuffleDeck([...originalDeck]);
    }

    deck.cards = shuffledDeck; // Update the deck with the shuffled cards
};

// Function to check if two decks are the same
const isSameDeck = (deck1, deck2) => {
    if (deck1.length !== deck2.length) return false;
    for (let i = 0; i < deck1.length; i++) {
        if (deck1[i] !== deck2[i]) return false;
    }
    return true;
};

// Function to shuffle a deck
const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

// Function to paginate the deck
const paginateDeck = () => {
    const startIndex = (currentPage.value - 1) * pageSize;
    return deck.cards.slice(startIndex, startIndex + pageSize);
};

// Computed property to get the current page's cards
const paginatedCards = computed(() => paginateDeck());

// Function to handle page change
const onPageChange = (page) => {
    currentPage.value = page;
};

// Computed property to get total number of pages
const totalPages = computed(() => Math.ceil(deck.cards.length / pageSize));

const editTitle = async () => {
    form.patch(route("deck.updateTitle", { deck: deck.id }), {
        onSuccess: () => form.clearErrors(),
    });
};

const deleteDeck = async () => {
    try {
        await router.delete(route("deck.destroy", { deck: deck.id }));
        // Handle success, e.g., show a success message
        console.log("Deck deleted successfully");
    } catch (error) {
        // Handle error, e.g., show an error message
        console.error("Error deleting deck:", error);
    }
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-row flex-wrap justify-between">
                <div class="flex flex-col">
                    <div
                        class="flex flex-row justify-center items-center gap-2"
                    >
                        <h2
                            class="font-semibold text-xl text-gray-800 leading-tight"
                        >
                            {{ deck.title }}
                        </h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="black"
                            class="w-5 h-5 cursor-pointer"
                            @click.stop="showEditTitleModal"
                        >
                            <path
                                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                            />
                            <path
                                d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                            />
                        </svg>
                    </div>

                    <!-- Main modal -->
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
                                        Edit Deck Title :
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
                                                >{{ deck.title }}</label
                                            >
                                            <input
                                                type="text"
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

                <button
                    class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    @click="deleteDeck(deck.id)"
                >
                    Delete Deck
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </template>
        <section class="relative" id="flashcardsDeck">
            <div
                v-for="(card, index) in deck.cards"
                :key="card.id"
                v-show="index === activeCardIndex"
                class="m-5 font-semibold inset-x-0 flex flex-wrap justify-center items-center transition-transform duration-500 ease-in-out"
            >
                <div
                    class="w-[700px] h-[450px] dark:text-slate-200 border border-gray-200 rounded-lg shadow dark:bg-sky-950 dark:border-sky-950 mb-2 w-80 h-80 flex flex-col justify-between cursor-pointer group perspective relative preserve-3d duration-1000"
                    :class="{
                        'flip-card': flippedStates[index],
                    }"
                    @click.stop="toggleFlip(index)"
                >
                    <div class="w-full h-full p-4">
                        <button
                            @click.stop="hintToggle"
                            class="rounded-lg dark:bg-yellow-500 p-1 text-sky-950 flex flex-wrap flex-row w-20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <p>Hint</p>
                        </button>
                        <!-- Small Modal -->
                        <div v-if="showHint" @click.stop="hintToggle">
                            <div class="absolute mr-2">
                                <!-- Modal content -->
                                <div
                                    class="relative rounded-lg shadow dark:bg-gray-700"
                                >
                                    <!-- Modal header -->
                                    <div
                                        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                                    >
                                        <h3
                                            class="text-xl font-medium text-gray-900 dark:text-white"
                                        >
                                            Here's a Hint :
                                        </h3>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="p-4 md:p-5 space-y-4">
                                        <p
                                            class="text-base leading-relaxed text-gray-500 dark:text-white"
                                        >
                                            {{ card.hint }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3
                            class="flex flex-col items-center justify-center h-full pb-10 text-3xl font-semibold text-center"
                        >
                            {{ card.question }}
                        </h3>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-7 h-7 m-2"
                        @click.stop="shuffleCards"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                        />
                    </svg>

                    <div
                        class="absolute flip-card backface-hidden w-full h-full dark:bg-sky-950 dark:border-sky-950 rounded-lg"
                    >
                        <div
                            class="text-center flex flex-col items-center justify-center h-full px-2 pb-24"
                        >
                            <p>
                                {{ card.answer }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Buttons container -->
        <div class="flex justify-evenly w-full mt-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12"
                @click="showPrevCard"
                :disabled="isPrevButtonDisabled"
                :class="{ 'fill-gray-400 cursor-not-allowed': !isActive }"
            >
                <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                    clip-rule="evenodd"
                />
            </svg>
            <span class="text-gray-800 font-bold mt-3 text-xl">
                {{ activeCardIndex + 1 }} / {{ deck.cards.length }}
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12"
                @click="showNextCard"
            >
                <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>

        <!-- flashcardsList section -->
        <section id="flashcardsList" class="mt-[300px]">
            <ul class="flex flex-wrap justify-center items-center">
                <li
                    v-for="card in paginatedCards"
                    :key="card.id"
                    class="w-[50%] flex m-5 dark:text-slate-200 border border-gray-200 rounded-lg shadow"
                >
                    <div
                        class="w-1/2 p-4 dark:bg-sky-900 dark:border-sky-900 flex justify-center items-center overflow-hidden"
                    >
                        <p>{{ card.question }}</p>
                    </div>
                    <div
                        class="w-1/2 p-4 dark:bg-sky-950 dark:border-sky-950 flex justify-center items-center flex-wrap"
                    >
                        <p>{{ card.answer }}</p>
                    </div>
                </li>
            </ul>

            <!-- Pagination -->
            <div class="flex justify-evenly w-full mt-5">
                <!-- Previous page button -->
                <button
                    @click="onPageChange(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="bg-gray-800 font-bold mt-3 mr-2 py-2 px-4 rounded-lg"
                    :class="{
                        'bg-gray-800 text-white': currentPage !== 1,
                        'bg-gray-200 text-black cursor-not-allowed text-gray-800':
                            currentPage === 1,
                    }"
                >
                    Previous
                </button>

                <!-- Page buttons -->
                <div class="flex">
                    <button
                        v-for="page in Math.min(totalPages, 10)"
                        :key="page"
                        @click="onPageChange(page)"
                        class="text-white bg-gray-800 font-bold mt-3 mr-2 py-2 px-4 rounded-lg"
                        :class="{ 'bg-yellow-800': currentPage === page }"
                    >
                        {{ page }}
                    </button>
                </div>

                <!-- Next page button -->
                <button
                    @click="onPageChange(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="text-white bg-gray-800 font-bold mt-3 mr-2 py-2 px-4 rounded-lg"
                    :class="{
                        'bg-gray-800': currentPage !== totalPages,
                        'bg-gray-300 text-black cursor-not-allowed':
                            currentPage === totalPages,
                    }"
                >
                    Next
                </button>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
