<script setup lang="ts">
import { ImageIcon } from "@/assets/icons";
import type { DocumentModel } from "../model";
import { computed } from "vue";

interface Props {
    item: DocumentModel;
    active?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "click"): void;
}>();

const url = computed(() => (props.item.blob ? URL.createObjectURL(props.item.blob) : null));
const size = computed(() => (props.item.blob ? Math.trunc(props.item.blob.size / 1024) : null));
</script>

<template>
    <button type="button" class="result-document-item" :class="{ active: props.active }" @click="emit('click')">
        <div class="result-document-item__img">
            <img v-if="url" :src="url" :alt="props.item.name" />
            <ImageIcon v-else />
        </div>
        <div class="result-document-item__info">
            <div class="result-document-item__info-name">{{ props.item.name }}</div>
            <div v-if="size" class="result-document-item__info-size">{{ size }}MB</div>
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
