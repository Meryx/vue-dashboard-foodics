<template>
  <button
    @click="toggleDarkMode"
    class="relative inline-flex items-center h-8 w-16 rounded-full bg-site-light dark:bg-site-dark focus:outline-none"
  >
    <!-- The toggle circle -->
    <span
      :class="[
        isDarkMode ? 'translate-x-9 bg-soft-gray' : 'translate-x-1 bg-yellow-500',
        'inline-block h-6 w-6 transform rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center',
      ]"
    >
      <!-- Sun Icon -->
      <SunIcon v-if="!isDarkMode" class="h-4 w-4 text-white m-auto" />
      <!-- Moon Icon -->
      <MoonIcon v-else class="h-4 w-4 text-white m-auto" />
    </span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'; // Importing the icons from Heroicons

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('color-theme');
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>
