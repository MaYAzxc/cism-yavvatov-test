<script lang="ts" setup>
import { computed } from "vue";
import { MyInput } from "@/shared/ui";

interface Props {
    modelValue?: string;
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
    <MyInput v-model="value" placeholder="Введите ID документа" type="text" />
</template>
