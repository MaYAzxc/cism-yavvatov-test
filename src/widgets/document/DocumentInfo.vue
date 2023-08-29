<script setup lang="ts">
import { ImageIcon } from "@/assets/icons";
import type { DocumentModel } from "@/entities/document";
import { MyButton } from "@/shared/ui";

interface Props {
    document: DocumentModel;
}

const props = defineProps<Props>();

const downloadDocument = () => {
    console.log("downloadDocument");
};

const deleteDocument = () => {
    console.log("deleteDocument");
};
</script>

<template>
    <div class="document-info">
        <div class="document-info__img">
            <img v-if="props.document.image" :src="props.document.image" :alt="props.document.name" />
            <ImageIcon v-else />
        </div>
        <div class="document-info__main">
            <div class="document-info__section">
                <div class="document-info__section__title">{{ props.document.name }}</div>
                <div class="document-info__btns">
                    <my-button color="blue" :disable="!props.document.image" @click="downloadDocument"
                        >Скачать</my-button
                    >
                    <my-button color="red" @click="deleteDocument">Удалить</my-button>
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
</template>

<style lang="scss" scoped>
.document-info {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    column-gap: 6rem;
    row-gap: 3rem;
    height: 100%;
    padding: 3rem;

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

        button {
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
