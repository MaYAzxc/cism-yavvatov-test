<script lang="ts" setup>
import type { DocumentModel } from "@/entities/document";
import { computed } from "vue";

export interface Props {
    document: DocumentModel;
}

const props = defineProps<Props>();

const url = computed(() => URL.createObjectURL(new Blob([props.document.description])));
</script>

<template>
    <a class="my-button blue" :href="url" :download="props.document.name">Скачать</a>
</template>
