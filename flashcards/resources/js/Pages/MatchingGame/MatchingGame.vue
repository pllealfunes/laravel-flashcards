<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import draggable from "vuedraggable";

const { deck, flashcards } = defineProps({ deck: Object, flashcards: Array });

const answersArray = ref([]);
const questionsArray = ref([]);
const newGame = ref(false);
const gameCards = ref([]);
const numCardsNeeded = 4;
const arrayFirstHalf = ref([]);
const arraySecondHalf = ref([]);
const results = ref(false);
const timer = ref(null);
const startTime = ref(0);
const elapsedTime = ref(0);
const isRunning = ref(false);
const displayTime = ref("");
const incorrectAttempts = ref(0);

const startRound = () => {
    // If there are 4 or fewer cards, display them all; otherwise, pick 4 random cards
    gameCards.value =
        flashcards.length <= numCardsNeeded
            ? flashcards
            : getRandomCards(flashcards, 4);
};

// Function to get random cards from the flashcards array
const getRandomCards = (cards, count) => {
    const shuffled = shuffleArray([...cards]);
    return shuffled.slice(0, count);
};

// Function to get repeated cards when flashcards are insufficient
const getRepeatedCards = (cards, count) => {
    let selectedCards = [];
    const availableCards = [...cards];
    while (selectedCards.length < count) {
        availableCards.sort(() => 0.5 - Math.random());
        selectedCards = [
            ...selectedCards,
            ...availableCards.slice(0, count - selectedCards.length),
        ];
    }
    return selectedCards;
};

const startWatch = () => {
    if (!isRunning.value) {
        startTime.value = Date.now() - elapsedTime.value;
        timer.value = setInterval(updateWatch, 10);
        isRunning.value = true;
    }
};

const stopWatch = () => {
    if (isRunning.value) {
        clearInterval(timer.value);
        elapsedTime.value = Date.now() - startTime.value;
        isRunning.value = false;
    }
};

const resetWatch = () => {
    clearInterval(timer.value);
    startTime.value = 0;
    elapsedTime.value = 0;
    isRunning.value = false;
    displayTime.value = "00:00:00:00";
};

const updateWatch = () => {
    const currentTime = Date.now();
    elapsedTime.value = currentTime - startTime.value;
    const hours = String(
        Math.floor(elapsedTime.value / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
        Math.floor((elapsedTime.value / (1000 * 60)) % 60)
    ).padStart(2, "0");
    const seconds = String(
        Math.floor((elapsedTime.value / 1000) % 60)
    ).padStart(2, "0");
    const milliseconds = String(
        Math.floor((elapsedTime.value % 1000) / 10)
    ).padStart(2, "0");
    displayTime.value = `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

const startGame = () => {
    results.value = false;
    newGame.value = true;
    startRound();
    resetWatch();
    incorrectAttempts.value = 0;
    let idCounter = 0;

    questionsArray.value = gameCards.value.map((flashcard) => ({
        id: idCounter++,
        type: "question",
        value: flashcard.question,
        style: "bg-sky-950",
    }));

    answersArray.value = gameCards.value.map((flashcard) => ({
        id: idCounter++,
        type: "answer",
        value: flashcard.answer,
        style: "bg-sky-950",
    }));

    // Shuffle both questions and answers to randomize their order
    questionsArray.value = shuffleArray(questionsArray.value);
    answersArray.value = shuffleArray(answersArray.value);

    // Clear and populate the arrays to be displayed
    arrayFirstHalf.value = questionsArray.value;
    arraySecondHalf.value = answersArray.value;

    startWatch();
};

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const isGameOver = computed(() => {
    return (
        arrayFirstHalf.value.every((card) => card.style === "hidden") &&
        arraySecondHalf.value.every((card) => card.style === "hidden")
    );
});

const checkGameOver = () => {
    if (isGameOver.value) {
        newGame.value = false;
        results.value = true;
        stopWatch();
        setTimeout(startGame, 2000);
    }
};

const onDragStart = (event, cardId) => {
    event.dataTransfer.setData("cardId", cardId);
};

const onDrop = (event, droppedId) => {
    event.preventDefault();

    const cardId = event.dataTransfer.getData("cardId");
    if (!cardId) {
        console.error("No cardId found in dataTransfer");
        return;
    }

    // Find the dragged card and dropped card in arraySecondHalf or arrayFirstHalf
    const draggedCard =
        arraySecondHalf.value.find((card) => card.id === Number(cardId)) ||
        arrayFirstHalf.value.find((card) => card.id === Number(cardId));
    const droppedCard =
        arraySecondHalf.value.find((card) => card.id === droppedId) ||
        arrayFirstHalf.value.find((card) => card.id === droppedId);

    if (!draggedCard || !droppedCard) {
        console.error("Dragged or dropped card object not found");
        return;
    }

    compareCards(draggedCard, droppedCard);
};

const compareCards = (draggedCard, droppedCard) => {
    const [firstCard, secondCard] = [draggedCard, droppedCard];

    if (firstCard.type === secondCard.type) {
        setCardStyles(firstCard, secondCard, "bg-red-500", 2000);
        incorrectAttempts.value++;
        return;
    }

    const questionCard = firstCard.type === "question" ? firstCard : secondCard;
    const answerCard = firstCard.type === "answer" ? firstCard : secondCard;

    const question = flashcards.find(
        (card) => card.question === questionCard.value
    );

    const answer = answersArray.value.find(
        (card) => card.value === answerCard.value
    );

    if (question && answer && question.answer === answer.value) {
        setCardStyles(firstCard, secondCard, "bg-green-500", 2000, "hidden");
    } else {
        setCardStyles(firstCard, secondCard, "bg-red-500", 2000, "bg-sky-950");
        incorrectAttempts.value++;
    }
};

const setCardStyles = (firstCard, secondCard, style, timeout, hiddenStyle) => {
    firstCard.style = style;
    secondCard.style = style;

    setTimeout(() => {
        firstCard.style = hiddenStyle;
        secondCard.style = hiddenStyle;
        checkGameOver(); // Check if the game is over after cards are compared
    }, timeout);
};
</script>

<template>
    <Head title="Matching Game" />
    <AuthenticatedLayout>
        <h1
            class="mt-6 mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-800 flex justify-center items-center"
        >
            Matching Game: {{ deck.title }}
        </h1>
        <div class="flex flex-col justify-center items-center">
            <button
                data-testid="new-game-btn"
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                @click="startGame"
            >
                New Game
            </button>
            <div v-if="newGame">{{ displayTime }}</div>
        </div>

        <section class="flex flex-col justify-center items-center">
            <div v-if="newGame" id="flashcardsDeck">
                <div
                    class="m-5 font-semibold flex flex-row justify-center items-center gap-4 first-half-card column card-container"
                >
                    <div v-for="element in arrayFirstHalf" :key="element.id">
                        <div
                            data-testid="non-draggable-cards"
                            :id="element.id"
                            :class="[
                                'w-[350px] h-[250px] dark:text-slate-200 border border-gray-200 rounded-lg shadow mb-2 flex flex-row justify-between cursor-pointer card',
                                element.style,
                            ]"
                            @dragover.prevent
                            @drop="onDrop($event, element.id)"
                        >
                            <div class="w-full h-full rounded-lg">
                                <div
                                    class="text-center text-md flex flex-col items-center justify-center h-full"
                                >
                                    <p class="text-smal">{{ element.value }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <draggable
                    :list="arraySecondHalf"
                    itemKey="id"
                    group="cards"
                    class="m-5 font-semibold flex flex-row justify-center items-center gap-4 first-half-card column card-container"
                >
                    <template #item="{ element }">
                        <div
                            data-testid="draggable-cards"
                            :key="element.id"
                            :id="element.id"
                            :class="[
                                'w-[350px] h-[250px] dark:text-slate-200 border border-gray-200 rounded-lg shadow mb-2 flex flex-row justify-between cursor-pointer card',
                                element.style,
                            ]"
                            @dragstart="onDragStart($event, element.id)"
                            @dragover.prevent
                        >
                            <div class="w-full h-full rounded-lg">
                                <div
                                    class="text-center text-md flex flex-col items-center justify-center h-full"
                                >
                                    <p class="text-small">
                                        {{ element.value }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>

            <div
                v-if="!newGame && !results"
                class="w-[400px] h-[400px] mt-7 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"
            >
                <p class="text-justify p-14 font-bold">
                    <b class="text-black">Rules of The Game :</b> Click on the
                    New Game button to start a new game. Drag cards from the
                    second row to match them to cards from the first row.
                </p>
            </div>
            <div v-if="results" class="flex justify-center items-center mt-5">
                <div
                    class="w-[400px] h-[400px] py-11 rounded-full flex flex-col items-center justify-center text-white bg-purple-500"
                >
                    <p class="text-2xl font-bold mt-5">
                        You Did It {{ $page.props.auth.user.name }}!
                    </p>
                    <p class="text-2xl font-bold m-5">Your Final Time Was :</p>
                    <p class="text-2xl font-bold m-5">
                        {{ displayTime }}
                    </p>
                    <p class="text-2xl font-bold m-5">
                        Number of Failed Attempts :
                    </p>
                    <p class="text-2xl font-bold m-5">
                        {{ incorrectAttempts }}
                    </p>
                </div>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
