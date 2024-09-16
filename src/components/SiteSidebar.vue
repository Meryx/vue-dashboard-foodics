<template>
  <div
    :style="{ width: sidebarWidth }"
    class="h-full flex flex-col pt-6 bg-light-gray dark:bg-dark-gray transition-width duration-300"
  >
    <div class="flex items-center justify-between px-4">
      <span v-if="!isCollapsed" class="text-charcoal dark:text-soft-gray text-xl font-semibold"
        >My App</span
      >
      <button @click="toggleSidebar" class="text-charcoal dark:text-soft-gray focus:outline-none">
        <span v-if="isCollapsed">Expand</span>
        <span v-else>Collapse</span>
      </button>
    </div>
    <nav class="flex-1 mt-6 px-3 space-y-2">
      <router-link
        to="/"
        :class="[
          'flex items-center px-4 py-2 rounded-md',
          'text-charcoal dark:text-soft-gray',
          'hover:bg-soft-gray dark:hover:bg-medium-gray',
          $route.path === '/' ? 'bg-soft-gray dark:bg-medium-gray' : '',
        ]"
      >
        <span v-if="!isCollapsed" class="ml-3">Home</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSidebarState } from '../composables/useSidebarState';
import { useRoute } from 'vue-router';

const { isCollapsed, toggleSidebar } = useSidebarState();
const $route = useRoute();

const sidebarWidth = computed(() => (isCollapsed.value ? '80px' : '256px'));
</script>
