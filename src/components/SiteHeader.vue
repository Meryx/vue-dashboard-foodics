<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white text-gray-900 shadow dark:bg-gray-800 dark:text-gray-100"
  >
    <div class="flex items-center justify-between p-4">
      <h1 class="text-xl font-semibold">Dashboard Title</h1>
      <div class="flex items-center space-x-4">
        <DarkModeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import DarkModeToggle from './DarkModeToggle.vue';
</script>
