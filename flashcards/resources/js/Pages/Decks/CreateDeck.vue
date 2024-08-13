<script setup>
import { useForm, Head, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ErrorToast from "@/Components/ErrorToast.vue";

const page = usePage();

const form = useForm({
    title: null,
    flashcards: [],
});

const addCard = () => {
    form.flashcards.push({
        question: "",
        answer: "",
        hint: "",
        difficulty: "",
        points: "",
    });
};

const deleteCard = (index) => {
    form.flashcards.splice(index, 1);
};

const submit = async () => {
    try {
        await form.post(route("deck.store"), {
            onSuccess: () => form.reset(),
        });
    } catch (error) {
        page.props.flash.error = `Unable to update card. Error: ${error}`;
    }
};
</script>

<template>
    <Head title="Create Deck" />
    <AuthenticatedLayout>
        <span v-for="(error, index) in $page.props.errors" :key="index">
            <ErrorToast v-if="error" :message="error" class="mb-3" />
        </span>

        <ErrorToast
            v-if="$page.props.flash.error"
            :message="$page.props.flash.error"
            class="mb-3"
        />

        <div
            v-if="form.errors.flashcards"
            class="mt-5 mb-2 bg-red-400 text-black font-bold p-3 border-red-600 border-2 border-solid flex flex-row gap-2 justify-center items-center"
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

            {{ form.errors.flashcards }}
        </div>

        <div
            v-if="form.errors.title"
            class="mt-2 mb-2 bg-red-400 text-black font-bold p-3 border-red-600 border-2 border-solid flex flex-row gap-2 justify-center items-center"
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

            {{ form.errors.title }}
        </div>
        <div class="flex justify-center items-center">
            <form
                @submit.prevent="submit"
                class="mt-8 w-full mx-3 md:w-1/2 lg:w-1/2"
            >
                <!-- deck title -->
                <div class="rounded-lg border-sky-950 p-5 bg-sky-950 mb-5">
                    <label for="title" class="block mb-2 bold text-slate-50"
                        >Deck Title :</label
                    >
                    <input
                        data-testid="title-input-create"
                        type="text"
                        v-model="form.title"
                        class="w-full text-lg font-medium"
                        name="title"
                        id="title"
                    />
                </div>
                <button
                    data-testid="add-card-btn-create"
                    type="button"
                    class="font-bold flex gap-2 justify-center items-center focus:outline-none dfont-bold ark:text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    @click="addCard"
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
                    Add Flashcards
                </button>
                <!-- add cards -->
                <div
                    v-for="(flashcard, index) in form.flashcards"
                    :key="index"
                    class="rounded-lg border-4 border-sky-950 bg-violet-500 bg-opacity-5 p-3 mb-5"
                >
                    <div class="flex justify-end m-3">
                        <button
                            class="flex flex-row gap-2 justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            @click="deleteCard(index)"
                        >
                            Delete Card
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
                    <!-- question -->
                    <label for="question" class="block font-bold my-3"
                        >Question :</label
                    >
                    <input
                        data-testid="question-input-create"
                        type="text"
                        v-model="flashcard.question"
                        class="w-full"
                        :class="{
                            'border-red-400':
                                form.errors[`flashcards.${index}.question`],
                        }"
                        name="question"
                        id="question"
                        :aria-label="`Card $(index+1) question`"
                    />
                    <InputError
                        :message="form.errors[`flashcards.${index}.question`]"
                        class="text-red-500 text-xs mt-1"
                    />
                    <!-- answer -->
                    <label for="answer" class="block font-bold my-3"
                        >Answer :</label
                    >
                    <input
                        data-testid="answer-input-create"
                        type="text"
                        v-model="flashcard.answer"
                        class="w-full"
                        :class="{
                            'border-red-400':
                                form.errors[`flashcards.${index}.answer`],
                        }"
                        name="answer"
                        id="answer"
                        :aria-label="`Card $(index+1) answer`"
                    />
                    <InputError
                        :message="form.errors[`flashcards.${index}.answer`]"
                        class="text-red-400 mt-1"
                    />
                    <!-- hint -->
                    <label for="hint" class="block font-bold my-3"
                        >Hint :</label
                    >
                    <input
                        data-testid="hint-input-create"
                        type="text"
                        v-model="flashcard.hint"
                        class="w-full"
                        name="hint"
                        id="hint"
                        :aria-label="`Card $(index+1) hint`"
                    />
                    <!-- difficulty level -->

                    <label for="difficulty" class="block font-bold m-2"
                        >Difficulty Level :</label
                    >

                    <select
                        data-testid="difficulty-select-create"
                        v-model="flashcard.difficulty"
                        name="difficulty"
                        id="difficulty"
                        :aria-label="`Card $(index+1) difficulty`"
                        :class="{
                            'border-red-400':
                                form.errors[`flashcards.${index}.difficulty`],
                        }"
                    >
                        <option disabled value="">Please Select One</option>
                        <option>easy</option>
                        <option>medium</option>
                        <option>hard</option>
                    </select>
                    <InputError
                        :message="form.errors[`flashcards.${index}.difficulty`]"
                        class="text-red-500 text-xs mt-1"
                    />

                    <!-- points -->
                    <label for="points" class="block font-bold m-2"
                        >Points :</label
                    >
                    <select
                        data-testid="points-select-create"
                        v-model="flashcard.points"
                        name="points"
                        id="points"
                        class="mr-2"
                        :aria-label="`Card $(index+1) points`"
                        :class="{
                            'border-red-400':
                                form.errors[`flashcards.${index}.points`],
                        }"
                    >
                        <option disabled value="">Please Select One</option>
                        <option>1</option>
                        <option>3</option>
                        <option>5</option>
                    </select>
                    <InputError
                        :message="form.errors[`flashcards.${index}.points`]"
                        class="text-red-500 text-xs mt-1"
                    />
                </div>

                <!-- submit -->
                <button
                    data-testid="create-deck-btn"
                    type="submit"
                    :disabled="form.processing"
                    class="block mt-5 font-bold uppercase focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Submit
                </button>
            </form>
        </div>
    </AuthenticatedLayout>
</template>
