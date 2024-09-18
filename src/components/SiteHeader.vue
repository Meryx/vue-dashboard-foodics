<template>
  <header
    class="flex items-center justify-between px-4 py-3 bg-off-white dark:bg-soft-black shadow-md"
  >
    <!-- Sidebar Toggle Button for Mobile -->
    <button
      @click="toggleSidebar"
      class="text-charcoal dark:text-soft-gray focus:outline-none md:hidden"
      aria-label="Toggle Sidebar"
    >
      <Bars3Icon class="h-6 w-6" />
    </button>

    <!-- Page Title -->
    <h1 class="text-xl font-semibold text-charcoal dark:text-soft-gray">
      {{ pageTitle }}
    </h1>

    <!-- Header Right Section -->
    <div class="flex items-center space-x-4">
      <!-- Theme Toggle Button -->
      <button
        @click="toggleTheme"
        class="text-charcoal dark:text-soft-gray focus:outline-none"
        aria-label="Toggle Theme"
      >
        <MoonIcon v-if="isDarkMode" class="h-6 w-6" />
        <SunIcon v-else class="h-6 w-6" />
      </button>

      <!-- User Avatar -->
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center focus:outline-none"
          aria-label="User Menu"
        >
          <img
            :src="avatar"
            alt="User Avatar"
            class="h-12 w-12 rounded-full object-cover border-2 border-bright-blue"
          />
        </button>

        <!-- Dropdown Menu -->
        <transition name="fade">
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-soft-black rounded-md shadow-lg py-2 z-50"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-charcoal dark:text-soft-gray hover:bg-gray-100 dark:hover:bg-medium-gray"
            >
              Profile
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-charcoal dark:text-soft-gray hover:bg-gray-100 dark:hover:bg-medium-gray"
            >
              Settings
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-charcoal dark:text-soft-gray hover:bg-gray-100 dark:hover:bg-medium-gray"
            >
              Logout
            </a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useSidebarState } from '../composables/useSidebarState';
import { useTheme } from '../composables/useTheme';
import { Bars3Icon, MoonIcon, SunIcon } from '@heroicons/vue/24/solid';

import avatarImage from '../assets/avatar.jpg'; // Adjust the path as needed

const route = useRoute();
const { toggleSidebar } = useSidebarState();
const { toggleTheme, isDarkMode } = useTheme();

const routeNameToTitle = {
  overview: 'Overview',
  posts: 'Posts',
  statistics: 'Statistics',
  NotFound: 'Page Not Found',
};

const pageTitle = computed(() => {
  return routeNameToTitle[route.name] || 'Dashboard';
});

const avatar = ref(avatarImage);

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative');
  if (!dropdown) {
    isDropdownOpen.value = false;
  }
};

window.addEventListener('click', handleClickOutside);

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>
