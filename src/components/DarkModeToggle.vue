<template>
  <button @click="toggleDarkMode" class="focus:outline-none">
    <span v-if="isDarkMode" :class="['text-soft-gray']">🌞 Light Mode</span>
    <span v-else :class="['text-charcoal']">🌜 Dark Mode</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
