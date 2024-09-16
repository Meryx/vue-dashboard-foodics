<template>
  <header
    class="flex items-center justify-between px-4 py-2 shadow bg-white dark:bg-very-dark-gray"
  >
    <h1 class="text-xl font-semibold text-charcoal dark:text-soft-gray">Dashboard Title</h1>
    <div class="flex items-center space-x-4">
      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup>
import DarkModeToggle from './DarkModeToggle.vue';
</script>
