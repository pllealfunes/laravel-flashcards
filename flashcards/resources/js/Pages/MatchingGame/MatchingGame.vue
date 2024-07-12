<script setup>
import { ref, computed } from "vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
import { VueDraggableNext } from "vue-draggable-next";

const { deck, flashcards } = defineProps({ deck: Object, flashcards: Array });

const currentCards = ref([]);
const flippedStates = ref([]);
const answersArray = ref([]);
const questionsArray = ref([]);
const pickedCards = ref([]);
const timer = ref(null);
const newGame = ref(true);
const startTime = ref(0);
const elapsedTime = ref(0);
const isRunning = ref(false);
const displayTime = ref("");
const results = ref(false);
const gameCards = ref([]);
const numCardsNeeded = 4;
const arrayFirstHalf = ref([]);
const arraySecondHalf = ref([]);

const startRound = () => {
    gameCards.value =
        flashcards.length >= numCardsNeeded
            ? getRandomCards(flashcards, numCardsNeeded)
            : getRepeatedCards(flashcards, numCardsNeeded);
};

const getRandomCards = (cards, count) => {
    return Array.from(
        { length: count },
        () => cards[Math.floor(Math.random() * cards.length)]
    );
};

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

const reset = () => {
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

const isGameOver = computed(() => {
    return flippedStates.value.every((card) => card.style === "hidden");
});

const startGame = () => {
    reset();
    gameCards.value = [];
    pickedCards.value = [];
    results.value = false;
    newGame.value = true;
    startRound();

    answersArray.value = gameCards.value.map(function (flashcard) {
        return { id: flashcard.id, type: "answer", value: flashcard.answer };
    });

    questionsArray.value = gameCards.value.map(function (flashcard) {
        return {
            id: flashcard.id,
            type: "question",
            value: flashcard.question,
        };
    });

    currentCards.value = [];
    for (let i = 0; i < gameCards.value.length; i++) {
        currentCards.value.push({
            ...questionsArray.value[i],
            matched: false,
            style: "bg-sky-950",
        });
        currentCards.value.push({
            ...answersArray.value[i],
            matched: false,
            style: "bg-sky-950",
        });
    }

    const half = Math.ceil(currentCards.value.length / 2);
    arrayFirstHalf.value = currentCards.value.slice(0, half);
    arraySecondHalf.value = currentCards.value.slice(half);

    //startWatch();
};

const checkGameOver = () => {
    if (isGameOver.value) {
        newGame.value = false;
        results.value = true;
        //stopWatch();
    }
};

const draggedCard = ref(null);

const startDrag = (event, card) => {
    if (card.matched) return; // Prevent dragging of matched cards
    draggedCard.value = card;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("cardId", card.id);
    console.log("Drag started:", card);
};

const onDrop = (event, droppedId) => {
    event.preventDefault();

    const cardId = event.dataTransfer.getData("cardId");
    if (!cardId) {
        console.error("No cardId found in dataTransfer");
        return;
    }

    console.log("Dropped cardId:", cardId);
    console.log("Dropped on cardId:", droppedId);

    const draggedCardElement = document.getElementById(`card-${cardId}`);
    const droppedCardElement = document.getElementById(`card-${droppedId}`);

    console.log("Dragged card element:", draggedCardElement);
    console.log("Dropped card element:", droppedCardElement);

    if (!draggedCardElement || !droppedCardElement) {
        console.error("Dragged or dropped card element not found");
        return;
    }

    // Find the card objects in arraySecondHalf and arrayFirstHalf
    const draggedCard = arraySecondHalf.value.find(
        (card) => card.id === Number(cardId)
    );
    const droppedCard = arrayFirstHalf.value.find(
        (card) => card.id === droppedId
    );
    console.log(draggedCard);
    console.log(droppedCard);
    if (!draggedCard || !droppedCard) {
        console.error("Dragged or dropped card object not found");
        return;
    }

    // Append the dragged card to the dropped card element
    if (!droppedCardElement.contains(draggedCardElement)) {
        droppedCardElement.appendChild(draggedCardElement);
        console.log("Card appended successfully");
    } else {
        console.error("Dropped card already contains the dragged card");
    }

    droppedCardElement.style.position = "relative";
    draggedCardElement.style.position = "absolute";
    draggedCardElement.style.top = "200px"; // Adjust as needed
};

const compareCards = (draggedCard, droppedCard) => {
    const [firstCard, secondCard] = [draggedCard, droppedCard];
    if (firstCard.type === secondCard.type) {
        setCardStyles(draggedCard, droppedCard, "bg-red-500", 2000);
        return;
    }

    const questionCard = firstCard.type === "question" ? firstCard : secondCard;
    const answerCard = firstCard.type === "answer" ? firstCard : secondCard;
    const question = flashcards.find(
        (card) => card.question === currentCards.value[questionCard.index].value
    );
    const answer = answersArray.value[answerCard.index];

    if (question.answer === answer.value) {
        console.log("cards matched");
    } else {
        console.log("cards didnt matched");
    }

    //checkGameOver();
};

const setCardStyles = (
    draggedCard,
    droppedCard,
    style,
    timeout,
    hiddenStyle = "bg-sky-950"
) => {
    droppedCard.style = style;
    draggedCard.style = style;
    setTimeout(() => {
        draggedCard.style = hiddenStyle;
        droppedCard.style = hiddenStyle;
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
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                @click="startGame()"
            >
                New Game
            </button>
        </div>

        <section class="flex flex-col justify-center items-center">
            <div
                v-if="newGame"
                class="grid md:grid-cols-2 lg:grid-cols-4"
                id="flashcardsDeck"
            >
                <div
                    v-for="(card, index) in arrayFirstHalf"
                    :key="card.id"
                    :id="`card-${card.id}`"
                    @drop="onDrop($event, card.id)"
                    @dragenter.prevent
                    @dragover.prevent
                    class="m-5 font-semibold flex flex-row justify-center items-center first-half-card column"
                >
                    <div
                        class="w-[350px] h-[250px] bg-sky-950 dark:text-slate-200 border border-gray-200 rounded-lg shadow mb-2 flex flex-row justify-between cursor-pointer card"
                    >
                        <div class="w-full h-full rounded-lg">
                            <div
                                class="text-center text-md flex flex-col items-center justify-center h-full"
                            >
                                <p class="text-smal">
                                    {{ card.value }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-for="(card, index) in arraySecondHalf"
                    :key="card.id"
                    class="m-5 font-semibold flex flex-row justify-center items-center first-half-card colum"
                >
                    <div
                        :id="`card-${card.id}`"
                        class="w-[350px] h-[250px] bg-sky-950 dark:text-slate-200 border border-gray-200 rounded-lg shadow mb-2 flex flex-row justify-between cursor-pointer"
                        draggable="true"
                        @dragstart="startDrag($event, card)"
                    >
                        <div class="w-full h-full rounded-lg">
                            <div
                                class="text-center text-md flex flex-col items-center justify-center h-full"
                            >
                                <p class="text-small">
                                    {{ card.value }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
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
        </section>
    </AuthenticatedLayout>
</template>
