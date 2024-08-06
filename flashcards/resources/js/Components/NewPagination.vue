<script setup>
import { Link, router } from "@inertiajs/vue3";

const props = defineProps({
    links: Array,
    from: Number,
    to: Number,
    total: Number,
});

const navigate = (url) => {
    router.visit(url, {
        preserveState: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <div class="flex justify-between items-center gap-10">
        <!-- Pagination Summary -->
        <div class="pagination-summary">
            Showing {{ from }} - {{ to }} of {{ total }}
        </div>

        <nav aria-label="Page navigation">
            <ul class="pagination flex items-center -space-x-px h-10 text-base">
                <li
                    v-for="link in links"
                    :key="link.url"
                    :class="{ active: link.active, disabled: !link.url }"
                >
                    <Link
                        v-if="link.url !== null"
                        :href="link.url"
                        class="flex items-center justify-center m-2 p-3 h-3 rounded-md leading-tight"
                        v-html="link.label"
                        :class="{
                            'bg-purple-700': link.active,
                            'text-white': link.active,
                            'hover:bg-sky-950': !link.active,
                        }"
                        @click.prevent="navigate(link.url)"
                    />
                    <span
                        v-else
                        class="flex items-center justify-center m-2 p-3 h-3 rounded-md leading-tight"
                        v-html="link.label"
                    ></span>
                </li>
            </ul>
        </nav>
    </div>
</template>
