<script setup>
import { Head, Link} from '@inertiajs/vue3';

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    }
});

const questions = [
"What artery supplies the retroperitoneal rectum?",
"Ich verstehe",
"Expansion Diffusion",
"What is the French word for rebirth?",
"What is a ratio?"
];

let randomQuestion = (() => {
    let question = questions[Math.floor(Math.random()*questions.length)];
    return question;
});

let question = setInterval(randomQuestion, 2000);

</script>

<template>
    <Head title="Welcome" />

    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
    >
        <div v-if="canLogin" class="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
            <Link
                v-if="$page.props.auth.user"
                :href="route('dashboard')"
                class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >Dashboard</Link
            >

            <template v-else class="max-w-screen-xl flex flex-wrap align-between justify-between mx-auto p-4">
                <Link
                    :href="route('login')"
                    class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Log in</Link
                >

                <Link
                    v-if="canRegister"
                    :href="route('register')"
                    class="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Register</Link
                >
            </template>
        </div>

        <div class="max-w-7xl mx-auto p-6 lg:p-8 flex flex-row justify-between flex-wrap">
            <div>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">FLASH</h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Study in a flash with decks, quizzes, and games.</p>
            </div>

<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col items-center p-20">
        <h5 class="text-xl text-center font-medium text-gray-900 dark:text-white">{{ question }}</h5>
    </div>
</div>

        </div>
    </div>

<section class="grid grid-cols-2 md:grid-cols-3 gap-4">

<a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnEweGVweXJjdmx2b3BoNjZqdm1wMzV3d2EwNGR3eTU1aXlkbTh0ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/YWmA09jP7J0duykcE4/giphy.gif" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Flashacards</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Create decks, organize them by subject, and search for the one you need for your next study session.</p>
    </div>
</a>
<a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenlhNW01OWlwMnlmZHVoaWx0bXFrM2JtNWNydDhwZHJ2bHRlZXhoeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l8Ri2pm57hRD5gCdKW/giphy.gif" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Quiz Yourself</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Quiz yourself before the big day and walk out of class with a smile.</p>
    </div>
</a>
<a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3lqN2pkOW9xcjF3NDVqdjQ0cnk4N2MycWx4b3N2aHN2aHpwb2E2ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/xZVQndT22cYfYryopX/giphy.gif" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Learning is Fun</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Learning is more fun with games. Study with your decks and have fun doing it with one of our games.</p>
    </div>
</a>

</section>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
