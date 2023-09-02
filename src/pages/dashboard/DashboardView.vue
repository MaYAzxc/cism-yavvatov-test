<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useDashboardStore } from "@/stores";
import { useDebouncedRef } from "@/shared/hooks";
import { DocumentSidebar } from "@/widgets/documentSidebar";
import { DocumentInfo } from "@/widgets/documentInfo";
import { type DocumentModel } from "@/entities/document";

const dashboardStore = useDashboardStore();

const searchText = useDebouncedRef("");

const user = "user";

watchEffect(() => {
    dashboardStore.fetchFiltredDocumentsByUser(user, { search: searchText.value.trim() });
});

const currentDocument = ref<DocumentModel>();

const deleteDocument = () => {
    if (currentDocument.value) {
        dashboardStore.deleteDocumentById(currentDocument.value?.id);
        currentDocument.value = undefined;
    }
};
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
                    <DocumentInfo
                        v-if="currentDocument"
                        :document="currentDocument"
                        @delete-document="deleteDocument"
                    />
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

        @media screen and (max-width: $mobile) {
            padding: 0 2rem;
        }
    }

    &-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: wrap;
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

        @media screen and (max-width: $mobile) {
            padding-top: 2rem;
        }
    }

    &-content {
        flex-grow: 1;
        padding-top: 1.5rem;
        padding-bottom: 5.8rem;
        overflow: hidden;

        @media screen and (max-width: $mobile) {
            padding-bottom: 2.8rem;
        }
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

        @media screen and (max-width: $mobile) {
            flex-direction: column;

            .document-sidebar {
                height: 50%;
            }

            &__detail {
                height: 50%;
                border-left: none;
                border-top: 1px solid $gray;
            }
        }
    }
}
</style>
