<template>
  <header
    class="flex items-center justify-between px-4 py-2 bg-white dark:bg-very-dark-gray shadow"
  >
    <div class="flex items-center">
      <button
        @click="toggleSidebar"
        class="text-charcoal dark:text-soft-gray focus:outline-none md:hidden mr-4"
      >
        Menu
      </button>
      <h1 class="text-xl font-semibold text-charcoal dark:text-soft-gray">Dashboard Title</h1>
    </div>
    <div class="flex items-center space-x-4">
      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup>
import DarkModeToggle from './DarkModeToggle.vue';
import { useSidebarState } from '../composables/useSidebarState';

const { toggleSidebar } = useSidebarState();
</script>
