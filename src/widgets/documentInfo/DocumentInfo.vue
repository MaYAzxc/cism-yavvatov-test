<script setup lang="ts">
import { ImageIcon } from "@/assets/icons";
import type { DocumentModel } from "@/entities/document";
import { DeleteDocument } from "@/features/document/deleteDocument";
import { DownloadDocument } from "@/features/document/downloadDocument";
import { computed } from "vue";

interface Props {
    document: DocumentModel;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "deleteDocument"): void;
}>();

const url = computed(() => (props.document.blob ? URL.createObjectURL(props.document.blob) : null));
</script>

<template>
    <div class="document-info">
        <div class="document-info-wrapper my-scroll">
            <div class="document-info__img">
                <img v-if="url" :src="url" :alt="props.document.name" />
                <ImageIcon v-else />
            </div>
            <div class="document-info__main">
                <div class="document-info__section">
                    <div class="document-info__section__title">{{ props.document.name }}</div>
                    <div class="document-info__btns">
                        <DownloadDocument :document="props.document" />
                        <DeleteDocument :disable="!url" @deleteDocument="emit('deleteDocument')" />
                    </div>
                </div>
                <div class="document-info__section">
                    <div class="document-info__section__title">Описание:</div>
                    <div class="document-info__desc">
                        <p>
                            {{ props.document.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.document-info {
    height: 100%;
    padding: 1.5rem;
    overflow: hidden;

    &-wrapper {
        display: flex;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        column-gap: 6rem;
        row-gap: 3rem;
        height: 100%;
        padding: 1.5rem;
        overflow: auto;
    }

    &__img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 42.5rem;
        height: 29rem;
        border: 1px solid $gray;

        img {
            max-width: 100%;
        }

        svg {
            width: 15rem;
            height: 15rem;
            color: $dark-gray;
        }

        @media screen and (max-width: $mobile) {
            height: auto;
        }
    }

    &__main {
        display: flex;
        flex-direction: column;
        row-gap: 4.5rem;
        width: 100%;
        max-width: 44rem;
    }

    &__section {
        &__title {
            margin-bottom: 1.4rem;
            font-size: 1.6rem;
            font-weight: 600;
            line-height: 2.2rem;
        }
    }

    &__btns {
        display: flex;
        flex-wrap: wrap;
        column-gap: 1.6rem;
        row-gap: 1rem;

        .my-button {
            width: 11.5rem;
        }
    }

    &__desc {
        font-size: 1.4rem;
        line-height: 1.7rem;
        color: $dark-gray;
    }
}
</style>
