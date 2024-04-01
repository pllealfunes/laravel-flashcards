<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { router, useForm, usePage } from "@inertiajs/vue3";
import SuccessToast from "@/Components/SuccessToast.vue";
import ErrorToast from "@/Components/ErrorToast.vue";
import CreateCardModal from "@/Components/CreateCardModal.vue";
import DeleteModal from "@/Components/DeleteModal.vue";
const { deck, flashcards } = defineProps(["deck", "flashcards"]);

const page = usePage();
const pageSize = 10;
const currentPage = ref(1);
const deleteDeckModal = ref(false);
const deleteCardModal = ref(false);
const updateCardModal = ref(false);
const addCardModal = ref(false);
const currentCard = ref(null);

// Function to paginate the deck
const paginateDeck = () => {
    const startIndex = (currentPage.value - 1) * pageSize;
    return flashcards.slice(startIndex, startIndex + pageSize);
};

// Computed property to get the current page's cards
const paginatedCards = computed(() => paginateDeck());

// Function to handle page change
const onPageChange = (page) => {
    currentPage.value = page;
};

// Computed property to get total number of pages
const totalPages = computed(() => Math.ceil(flashcards.length / pageSize));

const showAddCard = () => {
    addCardModal.value = !addCardModal.value;
};

const form = useForm({
    title: deck.title,
});

const showEditTitle = ref(false);

const showEditTitleModal = () => {
    showEditTitle.value = !showEditTitle.value;
    form.clearErrors();
    form.reset();
};

const editTitle = async () => {
    try {
        await form.patch(route("deck.updateTitle", { deck: deck.id }), {
            onSuccess: () => {
                showEditTitle.value = false;
            },
        });
    } catch (error) {
        page.props.flash.error = `Unable to update card. Error: ${error}`;
    }
};

let updateForm = {};

const showUpdateCard = (flashcard) => {
    currentCard.value = flashcard;
    updateForm = useForm({
        question: flashcard.question,
        answer: flashcard.answer,
        hint: flashcard.hint,
        difficulty: flashcard.difficulty,
        points: flashcard.points,
    });
    updateCardModal.value = !updateCardModal.value;
};

const updateCard = async () => {
    try {
        await updateForm.put(
            route("flashcard.update", { flashcard: currentCard.value }),
            {
                preserveState: (page) =>
                    Object.keys(page.props.errors).length > 0,
            },
            {
                onSuccess: () => {
                    updateCardModal.value = false;
                    updateForm.clearErrors();
                    currentCard.value = null;
                },
            }
        );
    } catch (error) {
        page.props.flash.error = `Unable to update card. Error: ${error}`;
    }
};

const showDeleteDeck = () => {
    deleteDeckModal.value = !deleteDeckModal.value;
};

const deleteDeck = async () => {
    try {
        await router.delete(route("deck.destroy", { deck: deck.id }));
    } catch (error) {
        page.props.flash.error = `Unable to delete deck. Error: ${error}`;
        deleteToast.value = false;
    }
};

const showDeleteCard = (flashcard) => {
    currentCard.value = flashcard;
    deleteCardModal.value = !deleteCardModal.value;
};

const deleteCard = async () => {
    try {
        // Find the index of the card in flashcards
        const cardIndex = flashcards.findIndex(
            (deleteCard) => deleteCard.id === currentCard.value.id
        );
        if (cardIndex !== -1) {
            // Remove the card from the array
            flashcards.splice(currentCard.value, 1);
            // Update the deck in the database with the updated cards array
            await router.delete(
                route("flashcard.destroy", { flashcard: currentCard.value }),
                {
                    preserveState: (page) =>
                        Object.keys(page.props.errors).length > 0,
                },
                {
                    onSuccess: () => {
                        deleteCardModal.value = false;
                        currentCard.value = null;
                    },
                }
            );
        } else {
            page.props.flash.error =
                "Unable to delete card or deck does not contain 2 cards.";
        }
    } catch (error) {
        page.props.flash.error = `Error Deleting Card: ${error}`;
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

                <div class="flex flex-row justify-evenly items-center">
                    <button
                        class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                        @click.stop="showAddCard"
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

                        Add Card
                    </button>

                    <button
                        class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        @click.stop="showDeleteDeck"
                    >
                        Delete Deck
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
                <CreateCardModal
                    :show="addCardModal"
                    @close="showAddCard"
                    :deckId="deck.id"
                    :deckUser="deck.user_id"
                />
            </div>
        </template>

        <DeleteModal
            :show="deleteDeckModal"
            @close="showDeleteDeck"
            :deleteFunction="deleteDeck"
            :message="`Are you sure you want to delete this deck?`"
        />

        <!-- Delete Card Modal-->
        <DeleteModal
            :show="deleteCardModal"
            @close="showDeleteCard"
            :deleteFunction="deleteCard"
            :message="`Are you sure you want to delete this card?`"
        />

        <SuccessToast
            v-if="$page.props.flash.success"
            :message="$page.props.flash.success"
        />
        <ErrorToast
            v-if="$page.props.flash.error"
            :message="$page.props.flash.error"
        />
        <!-- flashcardsList section -->
        <section id="flashcardsList" class="mt-10">
            <div class="flex flex-wrap justify-center items-center">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table
                        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-black"
                    >
                        <thead
                            class="text-xs text-gray-700 uppercase dark:text-gray-400"
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
                                <th
                                    scope="col"
                                    class="px-6 py-3 bg-gray-800 text-slate-50"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="flashcard in paginatedCards"
                                :key="flashcard.id"
                                class="border-b border-gray-200 dark:border-gray-700"
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
                                <td class="px-6 py-4">
                                    {{ flashcard.points }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button
                                            class="flex p-4 flex-row justify-center items-center focus:outline-none text-white font-dark bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            @click.stop="
                                                showDeleteCard(flashcard)
                                            "
                                        >
                                            <span>Delete Card</span>
                                            <span class="ml-1">
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
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            @click.stop="
                                                showUpdateCard(flashcard)
                                            "
                                            class="flex p-4 flex-row justify-center items-center focus:outline-none text-black font-dark bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                        >
                                            <span>Update Card</span>
                                            <span class="ml-1">
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
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Update Card Modal-->
                <div
                    v-if="updateCardModal"
                    class="fixed inset-0 z-50 overflow-y-auto"
                >
                    <div class="flex items-center justify-center min-h-screen">
                        <!-- Modal content -->
                        <div
                            class="relative bg-white rounded-lg shadow-lg w-full max-w-md"
                        >
                            <!-- Modal header -->
                            <div
                                class="flex justify-between items-center p-4 border-b"
                            >
                                <h3 class="text-lg font-semibold text-gray-900">
                                    Edit Card :
                                </h3>
                                <button
                                    @click="showUpdateCard(flashcard)"
                                    type="button"
                                    class="text-gray-400 hover:text-gray-900"
                                >
                                    <svg
                                        class="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <!-- Modal body -->
                            <form
                                class="p-4"
                                @submit.prevent="updateCard(currentCard)"
                            >
                                <div class="grid gap-4 mb-4 grid-cols-2">
                                    <div class="col-span-2">
                                        <label
                                            for="question"
                                            class="block mb-2 text-sm font-medium text-gray-900 text-black"
                                            >* Question :
                                        </label>
                                        <input
                                            type="text"
                                            class="mb-2 w-full text-black"
                                            v-model="updateForm.question"
                                        />
                                        <p
                                            v-if="updateForm.errors.question"
                                            class="text-red-500 mb-2"
                                        >
                                            {{ updateForm.errors.question }}
                                        </p>
                                        <label
                                            for="points"
                                            class="block mb-2 text-sm font-medium text-gray-900 text-black"
                                            >* Answer :
                                        </label>
                                        <input
                                            type="text"
                                            class="mb-2 w-full text-black"
                                            v-model="updateForm.answer"
                                        />
                                        <p
                                            v-if="updateForm.errors.answer"
                                            class="text-red-500 mb-2"
                                        >
                                            {{ updateForm.errors.answer }}
                                        </p>
                                        <label
                                            for="hint"
                                            class="block mb-2 text-sm font-medium text-gray-900 text-black"
                                            >Hint :</label
                                        >
                                        <input
                                            type="text"
                                            class="mb-2 w-full text-black"
                                            v-model="updateForm.hint"
                                        />
                                        <p
                                            v-if="updateForm.errors.hint"
                                            class="text-red-500 mb-2"
                                        >
                                            {{ updateForm.errors.hint }}
                                        </p>
                                        <label
                                            for="difficulty"
                                            class="block mb-2 text-sm font-medium text-gray-900 text-black"
                                            >Difficulty level :</label
                                        >
                                        <select
                                            v-model="updateForm.difficulty"
                                            name="difficulty"
                                            class="mb-2 text-black"
                                        >
                                            <option disabled value="">
                                                Please select one
                                            </option>
                                            <option>easy</option>
                                            <option>medium</option>
                                            <option>hard</option>
                                        </select>
                                        <p
                                            v-if="updateForm.errors.difficulty"
                                            class="text-red-500 mb-2"
                                        >
                                            {{ updateForm.errors.difficulty }}
                                        </p>
                                        <label
                                            for="points"
                                            class="block mb-2 text-sm font-medium text-gray-900 text-black"
                                            >Points :</label
                                        >
                                        <select
                                            v-model="updateForm.points"
                                            name="difficultylevel"
                                            class="text-black"
                                        >
                                            <option disabled value="">
                                                Please select one
                                            </option>
                                            <option>1</option>
                                            <option>3</option>
                                            <option>5</option>
                                        </select>
                                        <p
                                            v-if="updateForm.errors.points"
                                            class="text-red-500 mb-2"
                                        >
                                            {{ updateForm.errors.points }}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    :disabled="updateForm.processing"
                                    class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pagination -->
        <div class="flex justify-evenly w-full mt-10">
            <!-- Previous page button -->
            <button
                @click="onPageChange(currentPage - 1)"
                :disabled="currentPage === 1"
                class="bg-gray-800 font-bold mt-3 mr-2 py-2 px-4 rounded-lg"
                :class="{
                    'bg-gray-800 text-white': currentPage !== 1,
                    'bg-gray-200 text-white cursor-not-allowed text-gray-800':
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
                @click.stop="onPageChange(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="text-white bg-gray-800 font-bold mt-3 mr-2 py-2 px-7 rounded-lg"
                :class="{
                    'bg-gray-800': currentPage !== totalPages,
                    'bg-gray-300 text-black cursor-not-allowed':
                        currentPage === totalPages,
                }"
            >
                Next
            </button>
        </div>
    </AuthenticatedLayout>
</template>
