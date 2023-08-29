<script setup lang="ts">
import type { DocumentModel } from "../model";
import DocumentItem from "./DocumentItem.vue";

interface Props {
    list: DocumentModel[];
    currentDocumentId?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "clickItem", item: DocumentModel): void;
}>();
</script>

<template>
    <DocumentItem
        v-for="item in props.list"
        :key="item.id"
        :item="item"
        :active="item.id === currentDocumentId"
        @click="emit('clickItem', item)"
    />
</template>
