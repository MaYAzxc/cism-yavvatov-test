<script lang="ts" setup>
import { type ButtonHTMLAttributes } from "vue";

export interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    color?: "red" | "blue";
    disable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: "button",
});

const emit = defineEmits<{
    (e: "click"): void;
}>();
</script>

<template>
    <button
        :type="props.type"
        :class="[props.class, props.color, { disable: props.disable }]"
        :disabled="props.disable"
        @click="emit('click')"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: 1px solid $dark-gray;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: $dark-gray;
    transition: $tr-bgr, $tr-color;

    &.red {
        border-color: $red;
        color: $red;

        &:hover,
        &:active,
        &:focus-visible {
            background-color: $red;
            color: $white;
        }
    }
    &.blue {
        border-color: $blue;
        color: $blue;

        &:hover,
        &:active,
        &:focus-visible {
            background-color: $blue;
            color: $white;
        }
    }

    &.disable {
        border-color: $dark-gray;
        color: $dark-gray;
        cursor: default;

        &:hover,
        &:active,
        &:focus-visible {
            background-color: unset;
            color: $dark-gray;
        }
    }

    &:hover,
    &:active,
    &:focus-visible {
        background-color: $dark-gray;
        color: $white;
    }
}
</style>
