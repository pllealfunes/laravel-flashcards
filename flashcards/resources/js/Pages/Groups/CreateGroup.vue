<script setup>
import { useForm, Head, usePage } from "@inertiajs/vue3";
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ErrorToast from "@/Components/ErrorToast.vue";

const { decks } = defineProps({ decks: Object });

const pageSize = 10;
const currentPage = ref(1);

// Computed property to get total number of pages
const totalPages = computed(() => Math.ceil(decks.length / pageSize));

// Function to handle page change
const onPageChange = (page) => {
    currentPage.value = page;
};

const page = usePage();

const checkedDecks = ref([]);

const form = useForm({
    title: "",
    decks: [],
});

const submit = async () => {
    try {
        form.decks = checkedDecks;
        await form.post(
            route("group.store"),
            {
                preserveState: (page) =>
                    Object.keys(page.props.errors).length > 0,
            },
            {
                onSuccess: () => form.reset(),
            }
        );
    } catch (error) {
        page.props.flash.error = `Unable to update card. Error: ${error}`;
    }
};
</script>

<template>
    <Head title="Create Group" />
    <AuthenticatedLayout>
        <div class="flex justify-center items-center">
            <form
                @submit.prevent="submit"
                class="mt-8 w-full mx-3 md:w-1/2 lg:w-1/2"
            >
                <ErrorToast
                    v-if="$page.props.flash.error"
                    :message="$page.props.flash.error"
                    class="mb-3"
                />
                <div
                    v-if="form.errors.title"
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

                    {{ form.errors.title }}
                </div>

                <div
                    v-if="form.errors.decks"
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

                    {{ form.errors.decks }}
                </div>
                <!-- deck title -->
                <div class="rounded-lg border-sky-950 p-5 bg-sky-950 mb-5">
                    <label
                        for="title"
                        class="block mb-2 font-bold text-slate-50"
                        >Group Title :</label
                    >
                    <input
                        type="text"
                        v-model="form.title"
                        class="w-full text-lg font-medium"
                        name="title"
                    />
                </div>

                <!-- add decks -->

                <div class="w-full">
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
                                        class="px-6 py-3 bg-gray-800 text-slate-50"
                                    >
                                        Deck Title
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 bg-gray-800 text-slate-50 text-right"
                                    >
                                        Available Decks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="deck in decks"
                                    :key="deck.id"
                                    class="border-b border-gray-200 dark:border-gray-700 text-black"
                                >
                                    <td class="px-6 py-4 text-black">
                                        {{ deck.title }}
                                    </td>
                                    <td class="px-6 py-4 text-black text-right">
                                        <label
                                            for="checkbox"
                                            class="text-black"
                                        >
                                            <input
                                                type="checkbox"
                                                :id="'checkbox-' + deck.id"
                                                v-model="checkedDecks"
                                                :value="deck.id"
                                            />
                                            Add to Group
                                        </label>
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
                                    Math.min(
                                        currentPage * pageSize,
                                        decks.length
                                    )
                                }}</span>
                                of
                                <span class="font-semibold">{{
                                    decks.length
                                }}</span>
                            </span>
                            <!-- Previous page button -->
                            <button
                                @click="onPageChange(currentPage - 1)"
                                :disabled="currentPage === 1"
                                :class="{
                                    'text-black cursor-pointer':
                                        currentPage !== 1,
                                    'cursor-not-allowed text-black':
                                        currentPage === 1,
                                }"
                            >
                                &laquo; Previous
                            </button>

                            <!-- Page buttons -->
                            <ul
                                class="inline-flex -space-x-px rtl:space-x-reverse"
                            >
                                <li
                                    v-for="page in Math.min(
                                        totalPages,
                                        pageSize
                                    )"
                                    :key="page"
                                >
                                    <a
                                        @click="onPageChange(page)"
                                        class="text-white bg-gray-800 font-bold mt-3 mr-2 py-1 px-2 rounded-lg"
                                        :class="{
                                            'bg-yellow-800':
                                                currentPage === page,
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

                <!-- submit -->
                <div class="flex justify-center items-center">
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="w-full block mt-5 font-bold uppercase focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </AuthenticatedLayout>
</template>

<script setup lang="ts"></script>
