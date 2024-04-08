<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Link, Head } from "@inertiajs/vue3";
const { deck, flashcards } = defineProps(["deck", "flashcards"]);

// Create an array to store the flipped state for each card
const currentCards = ref([...flashcards]);

const flippedStates = ref(new Array(currentCards.length).fill(false));
const activeCardIndex = ref(0); // Keep track of the index of the currently active card
const isActive = ref(false);
const showHint = ref(false);

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
    activeCardIndex.value =
        (activeCardIndex.value + 1) % currentCards.value.length;
    isActive.value = activeCardIndex.value !== 0;
};

const showPrevCard = () => {
    // Hide the currently active card
    flippedStates.value[activeCardIndex.value] = false;
    // Update activeCardIndex to point to the next card
    activeCardIndex.value =
        (activeCardIndex.value - 1) % currentCards.value.length;
    isActive.value = activeCardIndex.value !== 0;
};

// Computed property to determine if the Prev button should be disabled
const isPrevButtonDisabled = computed(() => activeCardIndex.value === 0);

const hintToggle = () => {
    showHint.value = !showHint.value;
};

const shuffleCards = () => {
    const originalDeck = [...currentCards.value]; // Create a copy of the original deck
    let shuffledDeck = shuffleDeck([...originalDeck]); // Initialize shuffled deck

    // Shuffle the deck until it's different from the original
    while (isSameDeck(originalDeck, shuffledDeck)) {
        shuffledDeck = shuffleDeck([...originalDeck]);
    }
    // Update the prop with the shuffled cards
    currentCards.value = shuffledDeck;
    return shuffledDeck;
};

// Function to check if two cards are the same
const isSameDeck = (card1, card2) => {
    if (card1.length !== card2.length) return false;
    for (let i = 0; i < card1.length; i++) {
        if (card1[i] !== card2[i]) return false;
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
    return currentCards.value.slice(startIndex, startIndex + pageSize);
};

// Computed property to get the current page's cards
const paginatedCards = computed(() => paginateDeck());

// Function to handle page change
const onPageChange = (page) => {
    currentPage.value = page;
};

// Computed property to get total number of pages
const totalPages = computed(() =>
    Math.ceil(currentCards.value.length / pageSize)
);
</script>

<template>
    <Head title="deck.title" />
    <AuthenticatedLayout>
        <template #header>
            <div class="flex flex-row justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    {{ deck.title }}
                </h2>
                <Link
                    :href="route('deck.showUpdatePage', { deck: deck.id })"
                    as="button"
                    type="button"
                    class="font-bold flex gap-2 justify-center items-center focus:outline-none dfont-bold ark:text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                    Edit Deck
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 font-bold"
                    >
                        <path
                            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                        />
                        <path
                            d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                        />
                    </svg>
                </Link>
            </div>
        </template>
        <section class="relative" id="flashcardsDeck">
            <div
                v-for="(card, index) in currentCards"
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
                                            {{
                                                card.hint
                                                    ? card.hint
                                                    : `No Hint Here! Good Luck!`
                                            }}
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
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-7 h-7 m-2"
                        @click.stop="shuffleCards"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                        />
                    </svg>
                    <div
                        class="absolute flip-card backface-hidden w-full h-full dark:bg-sky-950 dark:border-sky-950 rounded-lg"
                    >
                        <div
                            class="text-center text-xl flex flex-col items-center justify-center h-full"
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
        <div
            class="flex justify-evenly lg:justify-center lg:gap-20 items-center w-full mt-5"
        >
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
                {{ activeCardIndex + 1 }} / {{ currentCards.length }}
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
        <section id="flashcardsList" class="mt-[160px] p-5">
            <h3 class="text-3xl font-bold text-slate-600 text-center mb-11">
                Flashcards in this Deck
            </h3>
            <div class="flex flex-wrap justify-center items-center">
                <div
                    class="relative overflow-x-auto shadow-md rounded-lg mb-10"
                >
                    <table
                        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-10"
                    >
                        <thead
                            class="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-10"
                        >
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"
                                >
                                    Question
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"
                                >
                                    Answer
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"
                                >
                                    Hint
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 bg-gray-800 bg-gray-800 text-slate-50"
                                >
                                    Level
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 bg-gray-800 text-slate-50"
                                >
                                    Points
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="flashcard in paginatedCards"
                                :key="flashcard.id"
                                class="border-b border-gray-200 dark:border-gray-700 text-black"
                            >
                                <td class="px-6 py-4">
                                    {{ flashcard.question }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ flashcard.answer }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ flashcard.hint }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ flashcard.difficulty }}
                                </td>
                                <td class="px-11">
                                    {{ flashcard.points }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <nav
                        class="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
                        aria-label="Table navigation"
                    >
                        <span
                            class="text-sm font-normal mb-4 md:mb-0 block w-full md:inline md:w-auto"
                        >
                            Showing
                            <span class="font-semibold">{{
                                (currentPage - 1) * pageSize + 1
                            }}</span>
                            -
                            <span class="font-semibold">{{
                                Math.min(currentPage * pageSize, totalPages)
                            }}</span>
                            of
                            <span class="font-semibold">{{
                                currentCards.length
                            }}</span>
                        </span>
                        <!-- Previous page button -->
                        <button
                            @click="onPageChange(currentPage - 1)"
                            :disabled="currentPage === 1"
                            :class="{
                                'text-black cursor-pointer': currentPage !== 1,
                                'cursor-not-allowed text-black':
                                    currentPage === 1,
                            }"
                        >
                            &laquo; Previous
                        </button>

                        <!-- Page buttons -->
                        <ul class="inline-flex -space-x-px rtl:space-x-reverse">
                            <li
                                v-for="page in Math.min(totalPages, pageSize)"
                                :key="page"
                            >
                                <a
                                    @click="onPageChange(page)"
                                    class="text-white bg-gray-800 font-bold mt-3 mr-2 py-1 px-2 rounded-lg"
                                    :class="{
                                        'bg-yellow-800': currentPage === page,
                                    }"
                                    >{{ page }}</a
                                >
                            </li>
                        </ul>

                        <!-- Next page button -->
                        <button
                            @click="onPageChange(currentPage + 1)"
                            :disabled="currentPage === totalPages"
                            :class="{
                                'text-black cursor-pointer':
                                    currentPage !== totalPages,
                                'text-black cursor-not-allowed':
                                    currentPage === totalPages,
                            }"
                        >
                            Next &raquo;
                        </button>
                    </nav>
                </div>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
