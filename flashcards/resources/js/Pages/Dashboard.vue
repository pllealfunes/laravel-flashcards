<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import Deck from "@/Pages/Decks/Index.vue";
import SuccessToast from "@/Components/SuccessToast.vue";

defineProps(["decks"]);
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>
        </div>
        <SuccessToast
            v-if="$page.props.flash.success"
            :message="$page.props.flash.success"
        />
        <div
            class="mt-6 flex flex-row flex-wrap justify-center items-center gap-4"
        >
            <Deck v-for="deck in decks" :key="deck.id" :deck="deck" />
        </div>
    </AuthenticatedLayout>
</template>
