<template>
    <div class="flex justify-bewteen items-center gap-10">
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
                    className="page-link"
                    class="flex items-center justify-center m-2 p-3 h-3 rounded-md leading-tight"
                    v-html="link.label"
                    :class="{
                        'bg-purple-700': link.active,
                        'text-white': link.active,
                        'hover:bg-sky-950': link.active,
                    }"
                />
                <span v-else className="page-link" v-html="link.label"></span>
            </li>
        </ul>
    </nav>
    </div>
</template>

<script setup>
import { Link} from "@inertiajs/vue3";
    const { links, from, to, total } = defineProps({
    links: Array,
    from: Number,
    to: Number,
    total: Number
});

const navigate = (url) => {
     this.$emit("navigate", url);
}
</script setup>
