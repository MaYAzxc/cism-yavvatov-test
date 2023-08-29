<script lang="ts" setup>
import { computed, type InputHTMLAttributes } from "vue";

export interface Props extends /* @vue-ignore */ InputHTMLAttributes {
    modelValue?: any;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <input :type="props.type" :placeholder="props.placeholder" v-model="value" />
</template>

<style lang="scss" scoped>
input {
    width: 100%;
    border: 1.5px solid $pale-gray;
    padding: 1.6rem 2.4rem;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    line-height: 1.7rem;

    &::placeholder {
        color: $dark-gray;
    }
}
</style>
