<script setup>
defineProps(["deck"]);
</script>

<template>
    <div class="p-6 flex space-x-2">
        <div class="flex-1">
            <div class="flex justify-between items-center">
                <div>
                    <small class="ml-2 text-sm text-gray-600">{{
                        new Date(deck.created_at).toLocaleString()
                    }}</small>
                </div>
            </div>
            <p class="mt-4 text-lg text-gray-900">{{ deck.title }}</p>
        </div>
    </div>
</template>
