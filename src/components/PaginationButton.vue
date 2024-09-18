<template>
  <button
    @click="onClick"
    :disabled="disabled"
    class="px-2 py-1 bg-light-gray dark:bg-dark-gray text-charcoal dark:text-soft-gray rounded-md hover:bg-soft-gray dark:hover:bg-medium-gray disabled:opacity-50"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
