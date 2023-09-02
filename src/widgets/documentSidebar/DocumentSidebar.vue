<script setup lang="ts">
import { computed, ref } from "vue";
import { DocumentsList, type DocumentModel } from "@/entities/document";
import { SearchDocuments } from "@/features/document/searchDocuments";

interface Props {
    searchText?: string;
    documents: DocumentModel[] | null;
    currentDocumentId?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "update:searchText", value: any): void;
    (e: "clickItemDocument", item: DocumentModel): void;
}>();

const searchText = computed({
    get() {
        return props.searchText;
    },
    set(value) {
        emit("update:searchText", value);
    },
});
</script>

<template>
    <div class="document-sidebar">
        <div class="document-sidebar__search">
            <label>
                <div>Поиск документа</div>
                <SearchDocuments v-model="searchText" />
            </label>
        </div>
        <div class="document-sidebar__results">
            <div class="document-sidebar__results__title">Результаты</div>
            <div class="document-sidebar__results__list my-scroll">
                <div v-if="!props.documents">loading..</div>
                <DocumentsList
                    v-else-if="props.documents.length"
                    :list="props.documents"
                    :currentDocumentId="currentDocumentId"
                    @click-item="emit('clickItemDocument', $event)"
                />
                <div v-else>Ничего не найдено</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.document-sidebar {
    display: flex;
    flex-direction: column;
    min-width: 28rem;
    flex-shrink: 0;
    overflow: hidden;

    &__search {
        padding: 2.5rem 2rem 0;

        label {
            div {
                margin-bottom: 1.4rem;
                font-size: 1.6rem;
                font-weight: 600;
                line-height: 2.2rem;
            }
        }
    }

    &__results {
        display: flex;
        flex-direction: column;
        padding: 3rem 0 0;
        overflow: hidden;

        &__title {
            margin: 0 2rem;
            font-size: 1.6rem;
            font-weight: 600;
            line-height: 2.2rem;
        }

        &__list {
            display: flex;
            flex-direction: column;
            row-gap: 1.8rem;
            padding: 1rem 2rem;
            margin: 0.8rem 0;
            overflow: auto;
        }
    }
}
</style>
