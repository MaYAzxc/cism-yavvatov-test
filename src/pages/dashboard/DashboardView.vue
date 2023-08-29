<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useDashboardStore } from "@/stores";
import { useDebouncedRef } from "@/shared/hooks";
import { DocumentSidebar, DocumentInfo } from "@/widgets/document";
import { type DocumentModel } from "@/entities/document";

const dashboardStore = useDashboardStore();

const searchText = useDebouncedRef("");

const user = "user";

watchEffect(() => {
    dashboardStore.fetchFiltredDocumentsByUser(user, { search: searchText.value.trim() });
});

const currentDocument = ref<DocumentModel>();
</script>

<template>
    <div class="dashboard">
        <header class="dashboard-container dashboard-header">
            <h1>CISM Yavvatov</h1>
            <span class="dashboard-header__user">Username</span>
        </header>
        <main class="dashboard-container dashboard-content">
            <div class="dashboard-block">
                <DocumentSidebar
                    v-model:search-text="searchText"
                    :documents="dashboardStore.documents"
                    :currentDocumentId="currentDocument?.id"
                    @click-item-document="currentDocument = $event"
                />
                <div class="dashboard-block__detail">
                    <DocumentInfo v-if="currentDocument" :document="currentDocument" />
                    <div v-else class="dashboard-block__detail__empty">
                        Выберите документ, чтобы посмотреть его содержиое
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.dashboard {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: $light-gray;

    &-container {
        padding: 0 5rem;
    }

    &-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-shrink: 0;
        padding-top: 4rem;
        padding-bottom: 2rem;

        &__user {
            font-size: 1.6rem;
            line-height: 2rem;
        }

        h1 {
            font-size: 3.2rem;
            font-weight: 3.9rem;
        }
    }

    &-content {
        flex-grow: 1;
        padding-top: 1.5rem;
        padding-bottom: 5.8rem;
        overflow: hidden;
    }

    &-block {
        height: 100%;
        display: flex;
        border-radius: 1rem;
        box-shadow: $shadow;

        &__detail {
            flex-grow: 1;
            border-left: 1px solid $gray;
            background: $white;

            &__empty {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                font-size: 1.4rem;
                line-height: 1.7rem;
                color: $dark-gray;
            }
        }
    }
}
</style>
