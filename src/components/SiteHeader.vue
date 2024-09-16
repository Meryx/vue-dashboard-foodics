<template>
  <header class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow">
    <div class="flex items-center justify-between p-4">
      <h1 class="text-xl font-semibold">Dashboard Title</h1>
      <DarkModeToggle />
    </div>
  </header>
</template>

<script setup>
import DarkModeToggle from './DarkModeToggle.vue';
</script>
