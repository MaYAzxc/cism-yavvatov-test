<script lang="ts" setup>
import { computed, type InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
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
    <input class="my-input" :type="props.type" :placeholder="props.placeholder" v-model="value" />
</template>
