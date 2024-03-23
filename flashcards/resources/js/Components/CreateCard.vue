<script setup>
import { useForm } from "@inertiajs/vue3";

const { deck, showAddCard, page } = defineProps([
    "deck",
    "showAddCard",
    "page",
    "addCardModal",
]);

const cardForm = useForm({
    question: null,
    answer: null,
    hint: null,
    difficultylevel: null,
    points: null,
});

const submit = async () => {
    console.log("click");
};
</script>

<template>
    <div v-if="addCardModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-lg w-full max-w-md">
                <!-- Modal header -->
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Add Card :
                    </h3>
                    <button
                        @click.stop="showAddCard"
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
                <form class="p-4" @submit.prevent="submit">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label
                                for="question"
                                class="block mb-2 uppercase font-bold text-xs m-1"
                                >Question :</label
                            >
                            <input
                                id="question"
                                name="question"
                                type="text"
                                v-model="cardForm.question"
                                class="mb-2 w-full text-black"
                            />
                            <p
                                v-if="cardForm.errors.question"
                                class="text-red-500 mb-2"
                            >
                                {{ cardForm.errors.question }}
                            </p>
                            <!-- answer -->
                            <label
                                for="answer"
                                class="block mb-2 uppercase font-bold text-xs m-1"
                                >Answer :</label
                            >
                            <input
                                id="answer"
                                name="answer"
                                type="text"
                                v-model="cardForm.answer"
                                class="mb-2 w-full text-black"
                            />
                            <p
                                v-if="cardForm.errors.answer"
                                class="text-red-500 mb-2"
                            >
                                {{ cardForm.errors.answer }}
                            </p>
                            <!-- hint -->
                            <label
                                for="hint"
                                class="block mb-2 uppercase font-bold text-xs m-1 w-full"
                                >Hint :</label
                            >
                            <input
                                id="hint"
                                name="hint"
                                type="text"
                                v-model="cardForm.hint"
                                class="mb-2 w-full text-black"
                            />
                            <p
                                v-if="cardForm.errors.hint"
                                class="text-red-500 mb-2"
                            >
                                {{ cardForm.errors.hint }}
                            </p>
                            <!-- difficulty level -->
                            <label
                                for="difficultylevel"
                                class="block mb-2 uppercase font-bold text-xs m-1"
                                >difficulty level :</label
                            >
                            <select
                                id="difficultylevel"
                                v-model="cardForm.difficultylevel"
                                name="difficultylevel"
                            >
                                <option disabled value="">
                                    Please select one
                                </option>
                                <option>easy</option>
                                <option>intermediate</option>
                                <option>hard</option>
                            </select>
                            <p
                                v-if="cardForm.errors.difficultylevel"
                                class="text-red-500 mb-2"
                            >
                                {{ cardForm.errors.difficultylevel }}
                            </p>
                            <!-- points -->
                            <label
                                for="points"
                                class="block mb-2 uppercase font-bold text-xs m-1"
                                >Points :</label
                            >
                            <select
                                id="points"
                                v-model="cardForm.points"
                                name="points"
                            >
                                <option disabled value="">
                                    Please select one
                                </option>
                                <option>1</option>
                                <option>3</option>
                                <option>5</option>
                            </select>
                            <p
                                v-if="cardForm.errors.points"
                                class="text-red-500 mb-2"
                            >
                                {{ cardForm.errors.points }}
                            </p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        :disabled="cardForm.processing"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
