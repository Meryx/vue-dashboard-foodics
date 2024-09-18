<template>
  <MainLayout>
    <div
      class="flex flex-col items-center justify-center h-full p-6 bg-site-lite dark:bg-site-dark text-charcoal dark:text-soft-gray"
    >
      <h1 class="text-5xl font-bold mb-4">404</h1>
      <p class="text-xl mb-6">Page Not Found</p>
      <RouterLink to="/" class="px-4 py-2 bg-bright-blue text-white rounded hover:bg-blue-600">
        Go to Overview
      </RouterLink>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { RouterLink } from 'vue-router';
</script>
