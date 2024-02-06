<script setup>
import { useForm } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import { formToJSON } from "axios";

const form = useForm({
    title: null,
    cards: [],
});

const addCard = () => {
    form.cards.push({
        question: "",
        answer: "",
        hint: "",
        points: "",
    });
};
</script>

<template>
    <Head title="Create Deck" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Create Deck
            </h2>
        </template>
        <div>
            <form
                @submit.prevent="form.post('/createdeck')"
                class="max-w-md mx-auto mt-8"
            >
                <!-- deck title -->
                <label
                    for="title"
                    class="block mb-2 uppercase font-bold text-xs text-gray-700"
                    >Deck Title</label
                >
                <input
                    type="text"
                    v-model="form.title"
                    class="w-full"
                    name="title"
                />
                <div v-if="form.errors.title">{{ form.errors.title }}</div>
                <div class="inline m-2">Cards</div>
                <button
                    type="button"
                    class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-yellow-900"
                    @click="addCard"
                >
                    ADD
                </button>
                <div v-for="(card, index) in form.cards" :key="index">
                    <!-- question -->
                    <label
                        for="question"
                        class="block mb-2 uppercase font-bold text-xs text-gray-700"
                        >Question</label
                    >
                    <input
                        type="text"
                        v-model="card.question"
                        class="w-full"
                        name="question"
                        :aria-label="`Card $(index+1) question`"
                    />
                    <div v-if="card.question">
                        {{ card.question }}
                    </div>
                    <!-- answer -->
                    <label
                        for="answer"
                        class="block mb-2 uppercase font-bold text-xs text-gray-700"
                        >Answer</label
                    >
                    <input
                        type="text"
                        v-model="card.answer"
                        class="w-full"
                        name="answer"
                        :aria-label="`Card $(index+1) answer`"
                    />
                    <div v-if="card.answer">
                        {{ card.answer }}
                    </div>
                    <!-- hint -->
                    <label
                        for="hint"
                        class="block mb-2 uppercase font-bold text-xs text-gray-700"
                        >Hint</label
                    >
                    <input
                        type="text"
                        v-model="card.hint"
                        class="w-full"
                        name="hint"
                        :aria-label="`Card $(index+1) hint`"
                    />
                    <div v-if="card.hint">
                        {{ card.hint }}
                    </div>
                    <!-- points-->
                    <label
                        for="points"
                        class="block mb-2 uppercase font-bold text-xs text-gray-700"
                        >Points</label
                    >
                    <input
                        type="text"
                        v-model="card.points"
                        name="points"
                        :aria-label="`Card $(index+1) points`"
                    />
                    <div v-if="card.points">
                        {{ card.points }}
                    </div>
                </div>
                <!-- submit -->
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="block mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Submit
                </button>
            </form>
        </div>
    </AuthenticatedLayout>
</template>
