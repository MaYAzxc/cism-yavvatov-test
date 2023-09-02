<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    disable?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "deleteDocument"): void;
}>();
</script>

<template>
    <button
        class="my-button red"
        :class="{ disable: props.disable }"
        :disabled="props.disable"
        @click="emit('deleteDocument')"
    >
        Удалить
    </button>
</template>
