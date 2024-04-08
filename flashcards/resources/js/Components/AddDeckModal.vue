<script setup>
import { computed, onMounted, onUnmounted, watch, ref } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import ErrorToast from "@/Components/ErrorToast.vue";

const page = usePage();

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: "2xl",
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    groupId: {
        type: Number,
    },
    availableDecks: {
        type: Array,
    },
});

const pageSize = 10;
const currentPage = ref(1);

// Computed property to get total number of pages
const totalPages = computed(() =>
    Math.ceil(props.availableDecks.length / pageSize)
);

// Function to handle page change
const onPageChange = (page) => {
    currentPage.value = page;
};

const emit = defineEmits(["close"]);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = null;
        }
    }
);

const close = () => {
    if (props.closeable) {
        emit("close");
    }
};

const closeOnEscape = (e) => {
    if (e.key === "Escape" && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener("keydown", closeOnEscape));

onUnmounted(() => {
    document.removeEventListener("keydown", closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[props.maxWidth];
});

const checkedDecks = ref([]);

const form = useForm({
    decks: [],
});

const submit = async () => {
    try {
        form.decks = checkedDecks;
        await form.put(
            route("group.addDeck", { group: props.groupId }),
            {
                preserveState: (page) =>
                    Object.keys(page.props.errors).length > 0,
            },
            {
                onSuccess: () => form.reset(),
            }
        );
    } catch (error) {
        page.props.flash.error = `Unable to add new Deck to Group. Error: ${error}`;
    }
};
</script>
<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-200">
            <div
                v-show="show"
                class="fixed inset-0 overflow-y-auto flex justify-center items-center z-50"
            >
                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-show="show"
                        class="fixed inset-0 bg-gray-500 opacity-75"
                        @click.stop="close"
                    ></div>
                </Transition>

                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="show"
                        class="mb-6 rounded-lg overflow-hidden transform transition-all sm:w-full sm:mx-auto"
                        :class="maxWidthClass"
                    >
                        <div class="flex justify-center items-center">
                            <div
                                class="relative p-4 w-full max-w-md max-h-full"
                            >
                                <div
                                    class="relative bg-white rounded-lg shadow"
                                >
                                    <h3
                                        class="mx-4 py-4 text-lg font-semibold text-gray-900"
                                    >
                                        Add Deck :
                                    </h3>
                                    <button
                                        type="button"
                                        class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        @click.stop="close"
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
                                    <hr />

                                    <ErrorToast
                                        v-if="form.errors.decks"
                                        :message="form.errors.decks"
                                    />

                                    <!-- Modal body -->
                                    <form class="p-4" @submit.prevent="submit">
                                        <div
                                            class="flex flex-col justify-center items-center"
                                        >
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
                                                                    Available
                                                                    Decks
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr
                                                                v-for="deck in props.availableDecks"
                                                                :key="deck.id"
                                                                class="border-b border-gray-200 dark:border-gray-700 text-black"
                                                            >
                                                                <td
                                                                    class="px-6 py-4 text-black"
                                                                >
                                                                    {{
                                                                        deck.title
                                                                    }}
                                                                </td>
                                                                <td
                                                                    class="px-6 py-4 text-black text-right"
                                                                >
                                                                    <label
                                                                        for="checkbox"
                                                                        class="text-black"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            :id="
                                                                                'checkbox-' +
                                                                                deck.id
                                                                            "
                                                                            v-model="
                                                                                checkedDecks
                                                                            "
                                                                            :value="
                                                                                deck.id
                                                                            "
                                                                        />
                                                                        Add to
                                                                        Group
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
                                                            <span
                                                                class="font-semibold"
                                                                >{{
                                                                    (currentPage -
                                                                        1) *
                                                                        pageSize +
                                                                    1
                                                                }}</span
                                                            >
                                                            -
                                                            <span
                                                                class="font-semibold"
                                                                >{{
                                                                    Math.min(
                                                                        currentPage *
                                                                            pageSize,
                                                                        availableDecks.length
                                                                    )
                                                                }}</span
                                                            >
                                                            of
                                                            <span
                                                                class="font-semibold"
                                                                >{{
                                                                    availableDecks.length
                                                                }}</span
                                                            >
                                                        </span>
                                                        <!-- Previous page button -->
                                                        <button
                                                            @click="
                                                                onPageChange(
                                                                    currentPage -
                                                                        1
                                                                )
                                                            "
                                                            :disabled="
                                                                currentPage ===
                                                                1
                                                            "
                                                            :class="{
                                                                'text-black cursor-pointer':
                                                                    currentPage !==
                                                                    1,
                                                                'cursor-not-allowed text-black':
                                                                    currentPage ===
                                                                    1,
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
                                                                    @click="
                                                                        onPageChange(
                                                                            page
                                                                        )
                                                                    "
                                                                    class="text-white bg-gray-800 font-bold mt-3 mr-2 py-1 px-2 rounded-lg"
                                                                    :class="{
                                                                        'bg-yellow-800':
                                                                            currentPage ===
                                                                            page,
                                                                    }"
                                                                    >{{
                                                                        page
                                                                    }}</a
                                                                >
                                                            </li>
                                                        </ul>

                                                        <!-- Next page button -->
                                                        <button
                                                            @click="
                                                                onPageChange(
                                                                    currentPage +
                                                                        1
                                                                )
                                                            "
                                                            :disabled="
                                                                currentPage ===
                                                                totalPages
                                                            "
                                                            :class="{
                                                                'text-black cursor-pointer':
                                                                    currentPage !==
                                                                    totalPages,
                                                                'text-black cursor-not-allowed':
                                                                    currentPage ===
                                                                    totalPages,
                                                            }"
                                                        >
                                                            Next &raquo;
                                                        </button>
                                                    </nav>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                :disabled="form.processing"
                                                class="block mt-5 font-bold uppercase focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
