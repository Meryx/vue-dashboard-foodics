<template>
  <header
    class="z-10 flex items-center justify-between px-4 py-2 bg-white dark:bg-very-dark-gray shadow-md"
  >
    <div class="flex items-center">
      <button
        @click="toggleSidebar"
        class="text-charcoal dark:text-soft-gray focus:outline-none md:hidden mr-4"
      >
        <Bars3Icon class="h-6 w-6" />
      </button>
      <h1 class="text-xl font-semibold text-charcoal dark:text-soft-gray">Posts Dashboard</h1>
    </div>

    <!-- Dark mode toggle -->
    <div class="flex items-center space-x-4">
      <DarkModeToggle />

      <!-- User avatar -->
      <img :src="avatarImage" alt="User Avatar" class="h-14 w-14 rounded-full object-cover" />
    </div>
  </header>
</template>

<script setup>
import DarkModeToggle from './DarkModeToggle.vue';
import { useSidebarState } from '../composables/useSidebarState';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import avatarImage from '../assets/avatar.jpg';

const { toggleSidebar } = useSidebarState();
</script>
