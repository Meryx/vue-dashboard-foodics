<template>
  <RouterLink
    :to="to"
    :class="[
      'flex items-center px-4 py-2 rounded-md text-charcoal dark:text-soft-gray',
      {
        'hover:bg-soft-gray dark:hover:bg-medium-gray': true,
        'bg-soft-gray dark:bg-medium-gray': isActive,
      },
    ]"
  >
    <slot></slot>
    <span v-if="!isCollapsed" class="ml-3">{{ label }}</span>
  </RouterLink>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const isActive = computed(() => route.path === props.to);
</script>
