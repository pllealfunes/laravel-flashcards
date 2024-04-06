<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, router } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";
import Index from "@/Pages/Decks/Index.vue";
import SuccessToast from "@/Components/SuccessToast.vue";

const { decks, groups } = defineProps(["decks", "groups"]);
const items = ref([]);

onMounted(async () => {
    let currentDecks = decks.filter(
        (deck) => !groups.some((group) => group.id === deck.group_id)
    );

    items.value = [
        ...currentDecks.map((deck) => ({ ...deck, type: "deck" })),
        ...groups.map((group) => ({ ...group, type: "group" })),
    ];
});
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
            <Index v-for="item in items" :key="item.id" :item="item" />
        </div>
    </AuthenticatedLayout>
</template>
