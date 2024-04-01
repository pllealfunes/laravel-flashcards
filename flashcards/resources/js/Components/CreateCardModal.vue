<script setup>
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";

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
    deckId: {
        type: Number,
    },
    deckUser: {
        type: Number,
    },
});

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

const form = useForm({
    deck_id: props.deckId,
    deck_user: props.deckUser,
    question: "",
    answer: "",
    hint: "",
    difficulty: "",
    points: "",
});

const createCard = async () => {
    try {
        await form.post(
            route("flashcard.store"),
            {
                preserveState: (page) =>
                    Object.keys(page.props.errors).length > 0,
            },
            {
                onSuccess: () => {
                    cardForm.clearErrors();
                    cardForm.reset();
                    emit("close");
                },
            }
        );
    } catch (error) {
        page.props.flash.error = `Error Deleting Card: ${error}`;
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
                                        Add Card :
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
                                    <!-- Modal body -->
                                    <form
                                        class="p-4"
                                        @submit.prevent="createCard"
                                    >
                                        <div
                                            class="grid gap-4 mb-4 grid-cols-2"
                                        >
                                            <div class="col-span-2">
                                                <label
                                                    for="question"
                                                    class="block mb-2 uppercase font-bold text-xs m-1"
                                                    >* Question :</label
                                                >
                                                <input
                                                    id="question"
                                                    name="question"
                                                    type="text"
                                                    v-model="form.question"
                                                    class="mb-2 w-full text-black"
                                                />
                                                <p
                                                    v-if="form.errors.question"
                                                    class="text-red-500 mb-2"
                                                >
                                                    {{ form.errors.question }}
                                                </p>
                                                <!-- answer -->
                                                <label
                                                    for="answer"
                                                    class="block mb-2 uppercase font-bold text-xs m-1"
                                                    >* Answer :</label
                                                >
                                                <input
                                                    id="answer"
                                                    name="answer"
                                                    type="text"
                                                    v-model="form.answer"
                                                    class="mb-2 w-full text-black"
                                                />
                                                <p
                                                    v-if="form.errors.answer"
                                                    class="text-red-500 mb-2"
                                                >
                                                    {{ form.errors.answer }}
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
                                                    v-model="form.hint"
                                                    class="mb-2 w-full text-black"
                                                />
                                                <p
                                                    v-if="form.errors.hint"
                                                    class="text-red-500 mb-2"
                                                >
                                                    {{ form.errors.hint }}
                                                </p>
                                                <!-- difficulty level -->

                                                <label
                                                    for="difficulty"
                                                    class="block mb-2 text-sm font-medium text-gray-900 text-black"
                                                    >Difficulty level :</label
                                                >
                                                <select
                                                    v-model="form.difficulty"
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
                                                    v-if="
                                                        form.errors.difficulty
                                                    "
                                                    class="text-red-500 mb-2"
                                                >
                                                    {{ form.errors.difficulty }}
                                                </p>

                                                <!-- points -->
                                                <label
                                                    for="points"
                                                    class="block mb-2 uppercase font-bold text-xs m-1"
                                                    >Points :</label
                                                >
                                                <select
                                                    id="points"
                                                    v-model="form.points"
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
                                                    v-if="form.errors.points"
                                                    class="text-red-500 mb-2"
                                                >
                                                    {{ form.errors.points }}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="flex justify-center items-center"
                                        >
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
