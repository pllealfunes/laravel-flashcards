<script setup>
import { Head, Link } from "@inertiajs/vue3";
import { defineProps } from "vue";

const props = defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
});
</script>

<template>
    <Head title="Welcome" />

    <nav class="bg-white border-gray-200 dark:bg-gray-900 sm:right-0">
        <div
            class="flex justify-between items-center mx-auto max-w-screen-xl p-4"
        >
            <div class="flex justify-center items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    class="w-6 h-6 mr-1"
                >
                    <path
                        d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                        clip-rule="evenodd"
                    />
                </svg>

                <a href="#">
                    <span
                        class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                        >Flash</span
                    >
                </a>
            </div>
            <div class="w-full md:w-auto" id="navbar-default">
                <div
                    v-if="canLogin"
                    class="text-end sm:top-0 sm:right-0 p-6 text-end"
                >
                    <Link
                        v-if="$page.props.auth.user"
                        :href="route('dashboard')"
                        class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >Dashboard</Link
                    >

                    <template
                        v-else
                        class="max-w-screen-xl flex flex-wrap align-between justify-between mx-auto p-4"
                    >
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
            </div>
        </div>
    </nav>

    <section
        class="relative flex justify-center items-center bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white py-10"
    >
        <div
            class="grid max-w-screen-xl px-4 py-8 w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
        >
            <div class="text-center">
                <h1
                    class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
                >
                    Study Smarter Not Harder.
                </h1>
                <p
                    class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
                >
                    Study in a flash with decks, quizzes, and games. Let us help
                    you get ready for the big day.
                </p>
            </div>
            <img
                class="lg:mx-5"
                src="/images/study.png"
                alt="A backpack with a computer on its left and a open notebook with pencil on the right"
            />
        </div>
    </section>

    <section
        class="p-10 mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 place-items-center"
    >
        <div
            class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"
        >
            <a href="#">
                <img
                    class="rounded-t-lg"
                    src="/images/Studying-cuate.png"
                    alt="Studying Education illustrations by Storyset"
                />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5
                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        Create Flashacards
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Create decks, organize them by subject, and search for the
                    one you need for your next study session.
                </p>
            </div>
        </div>

        <div
            class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"
        >
            <a href="#">
                <img
                    class="rounded-t-lg"
                    src="/images/Online-test-bro.png"
                    alt="Online Test People Illustrations by Storyset"
                />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5
                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        Quiz Yourself
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Quiz yourself before the big day is of the best ways to get
                    ready for the big day. Walk out of the test with a smile.
                </p>
            </div>
        </div>

        <div
            class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"
        >
            <a href="#">
                <img
                    class="rounded-t-lg"
                    src="/images/Online-games-addiction-bro.png"
                    alt="Online Games Addiction Bro by Storyset"
                />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5
                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        Learning is Fun
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Learning is more fun with games. Study with your decks and
                    have fun doing it with one of our games.
                </p>
            </div>
        </div>
    </section>

    <footer class="shadow dark:bg-gray-900 mt-10">
        <div class="mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-end sm:justify-end">
                <ul
                    class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-3"
                >
                    <Link
                        :href="route('about')"
                        class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >About</Link
                    >
                    <li>
                        <a
                            href="https://github.com/pllealfunes/laravel-flashcards"
                            class="hover:underline me-4 md:me-6"
                            >GitHub</a
                        >
                    </li>
                </ul>
            </div>
            <hr
                class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
            />
            <span
                class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
                >© 2024 <a href="#" class="hover:underline">Flash™</a>. All
                Rights Reserved.</span
            >
        </div>
    </footer>
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
