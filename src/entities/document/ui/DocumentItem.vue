<script setup lang="ts">
import { ImageIcon } from "@/assets/icons";
import type { DocumentModel } from "../model";

interface Props {
    item: DocumentModel;
    active?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "click"): void;
}>();
//const img = new Image();
//try {
//    img.src = props.item.image; //здесь начнется загрузка картинки
//    img.onload = function () {
//        console.log("LOAD", img.width, img.height); // а вот здесь мы уже знаем ее размеры
//    };
//} catch (error) {
//    console.log(error);
//}
const getImageSizeInBytes = (imgURL: string) => {
    const request = new XMLHttpRequest();
    request.open("HEAD", imgURL, false);
    request.send(null);
    const headerText = request.getAllResponseHeaders();
    const re = /Content\-Length\s*:\s*(\d+)/i;
    re.exec(headerText);
    return parseInt(RegExp.$1);
};

//console.log(getImageSizeInBytes(props.item.image));
</script>

<template>
    <button type="button" class="result-document-item" :class="{ active: props.active }" @click="emit('click')">
        <div class="result-document-item__img">
            <img v-if="props.item.image" :src="props.item.image" :alt="props.item.name" />
            <ImageIcon v-else />
        </div>
        <div class="result-document-item__info">
            <div class="result-document-item__info-name">{{ props.item.name }}</div>
            <div class="result-document-item__info-size">12 MB</div>
        </div>
    </button>
</template>

<style lang="scss" scoped>
.result-document-item {
    display: flex;
    flex-shrink: 0;
    background-color: $white;
    box-shadow: $shadow;
    border-radius: 1rem;
    overflow: hidden;

    &__img {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 7rem;
        height: 7rem;
        border-right: 1px solid $gray;

        img {
            width: 100%;
            height: 100%;
        }

        svg {
            width: 3rem;
            height: 3rem;
            color: $dark-gray;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 0.6rem;
        width: 100%;
        padding: 0.5rem 1.5rem;
        font-size: 1.4rem;
        line-height: 1.7rem;
        transition: $tr-bgr;

        &-name {
            font-weight: 600;
        }

        &-size {
            color: $dark-gray;
        }
    }

    &:hover,
    &:active,
    &:focus-visible {
        .result-document-item__info {
            background-color: rgba($blue, 0.2);
        }
    }

    &.active {
        .result-document-item__info {
            color: $white;
            background-color: $blue;

            &-size {
                color: $white;
            }
        }
    }
}
</style>
