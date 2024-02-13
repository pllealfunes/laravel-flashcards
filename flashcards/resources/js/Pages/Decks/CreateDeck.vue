<script setup>
import { ref } from "vue";
import { useForm, Head } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { formToJSON } from "axios";

const cardsLength = ref(false);
const form = useForm({
    title: null,
    cards: [],
});

const addCard = () => {
    form.cards.push({
        question: "",
        answer: "",
        hint: "",
        difficultylevel: "",
        points: "",
    });
};

const deleteCard = (index) => {
    form.cards.splice(index, 1);
};

const submit = () => {
    form.post(route("deck.store"), {
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Create Deck" />
    <AuthenticatedLayout>
        <div>
            <form @submit.prevent="submit" class="max-w-md mx-auto mt-8">
                <!-- deck title -->
                <InputError :message="form.errors.cards" class="m-2" />
                <InputError :message="form.errors.title" class="m-2" />
                <div
                    class="rounded-lg border-violet-800 p-3 bg-violet-950 mb-5"
                >
                    <label
                        for="title"
                        class="block mb-2 uppercase font-bold text-xs text-slate-50"
                        >Deck Title :</label
                    >
                    <input
                        type="text"
                        v-model="form.title"
                        class="w-full"
                        name="title"
                    />
                </div>
                <button
                    type="button"
                    class="focus:outline-none text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-violet-900 mb-5"
                    @click="addCard"
                >
                    + ADD CARD
                </button>
                <!-- add cards -->
                <div
                    v-for="(card, index) in form.cards"
                    :key="index"
                    class="rounded-lg border-4 border-violet-800 p-3 mb-5"
                >
                    <button
                        type="button"
                        class="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-red-900 mb-5"
                        @click="deleteCard(index)"
                    >
                        Delete
                    </button>
                    <!-- question -->
                    <label
                        for="question"
                        class="block mb-2 uppercase font-bold text-xs m-1"
                        >Question :</label
                    >
                    <input
                        type="text"
                        v-model="card.question"
                        class="w-full"
                        :class="{
                            'border-red-400':
                                form.errors[`cards.${index}.question`],
                        }"
                        name="question"
                        :aria-label="`Card $(index+1) question`"
                    />
                    <!-- answer -->
                    <label
                        for="answer"
                        class="block mb-2 uppercase font-bold text-xs m-1"
                        >Answer :</label
                    >
                    <input
                        type="text"
                        v-model="card.answer"
                        class="w-full"
                        :class="{
                            'border-red-400':
                                form.errors[`cards.${index}.answer`],
                        }"
                        name="answer"
                        :aria-label="`Card $(index+1) answer`"
                    />
                    <!-- hint -->
                    <label
                        for="hint"
                        class="block mb-2 uppercase font-bold text-xs m-1"
                        >Hint :</label
                    >
                    <input
                        type="text"
                        v-model="card.hint"
                        class="w-full"
                        :class="{
                            'border-red-400':
                                form.errors[`cards.${index}.hint`],
                        }"
                        name="hint"
                        :aria-label="`Card $(index+1) hint`"
                    />
                    <!-- difficulty level -->
                    <label
                        for="points"
                        class="block mb-2 uppercase font-bold text-xs m-1"
                        >difficulty level :</label
                    >
                    <select
                        v-model="card.difficultylevel"
                        name="difficultylevel"
                        :aria-label="`Card $(index+1) difficultylevel`"
                        :class="{
                            'border-red-400':
                                form.errors[`cards.${index}.difficultylevel`],
                        }"
                    >
                        <option disabled value="">Please select one</option>
                        <option>easy</option>
                        <option>intermediate</option>
                        <option>hard</option>
                    </select>
                    <!-- points -->
                    <label
                        for="points"
                        class="block mb-2 uppercase font-bold text-xs text-slate-50 m-1"
                        >Points :</label
                    >
                    <select
                        v-model="card.points"
                        name="difficultylevel"
                        :aria-label="`Card $(index+1) points`"
                        :class="{
                            'border-red-400':
                                form.errors[`cards.${index}.points`],
                        }"
                    >
                        <option disabled value="">Please select one</option>
                        <option>1</option>
                        <option>3</option>
                        <option>5</option>
                    </select>
                </div>
                <!-- submit -->
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="block mt-5 uppercase focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Submit
                </button>
            </form>
        </div>
    </AuthenticatedLayout>
</template>
