<template>
  <!-- Overlay for mobile when sidebar is open -->
  <div
    v-if="isSidebarOpen"
    class="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
    @click="closeSidebar"
  ></div>

  <!-- Sidebar Container -->
  <div
    :class="[
      'fixed z-40 inset-y-0 left-0 overflow-y-auto md:transition-width duration-300 transform bg-light-gray dark:bg-dark-gray shadow-right',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static md:inset-0',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Sidebar Header -->
    <div
      :class="['flex items-center px-4 py-4', isCollapsed ? 'justify-center' : 'justify-between']"
    >
      <!-- Sidebar Title -->
      <span v-if="!isCollapsed" class="text-charcoal dark:text-soft-gray text-xl font-semibold">
        Dashboard
      </span>
      <!-- Collapse/Expand Buttons -->
      <div class="flex items-center">
        <button
          @click="toggleCollapse"
          class="text-charcoal dark:text-soft-gray focus:outline-none"
        >
          <ChevronDoubleLeftIcon v-if="!isCollapsed" class="h-6 w-6" aria-hidden="true" />
          <ChevronDoubleRightIcon v-else class="h-6 w-6" aria-hidden="true" />
        </button>
        <!-- Close Sidebar Button for Mobile -->
        <button
          v-if="!isCollapsed"
          @click="closeSidebar"
          class="ml-2 text-charcoal dark:text-soft-gray focus:outline-none md:hidden"
        >
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-3 space-y-2">
      <!-- Overview Link -->
      <RouterLink
        to="/"
        class="flex items-center px-4 py-2 rounded-md text-charcoal dark:text-soft-gray hover:bg-soft-gray dark:hover:bg-medium-gray"
        :class="{ 'bg-soft-gray dark:bg-medium-gray': $route.path === '/' }"
      >
        <HomeIcon class="h-6 w-6" aria-hidden="true" />
        <span v-if="!isCollapsed" class="ml-3">Overview</span>
      </RouterLink>

      <!-- Posts Link -->
      <RouterLink
        to="/posts"
        class="flex items-center px-4 py-2 rounded-md text-charcoal dark:text-soft-gray hover:bg-soft-gray dark:hover:bg-medium-gray"
        :class="{ 'bg-soft-gray dark:bg-medium-gray': $route.path === '/posts' }"
      >
        <ClipboardDocumentListIcon class="h-6 w-6" aria-hidden="true" />
        <span v-if="!isCollapsed" class="ml-3">Posts</span>
      </RouterLink>

      <!-- Statistics Link -->
      <RouterLink
        to="/statistics"
        class="flex items-center px-4 py-2 rounded-md text-charcoal dark:text-soft-gray hover:bg-soft-gray dark:hover:bg-medium-gray"
        :class="{ 'bg-soft-gray dark:bg-medium-gray': $route.path === '/statistics' }"
      >
        <ChartBarIcon class="h-6 w-6" aria-hidden="true" />
        <span v-if="!isCollapsed" class="ml-3">Statistics</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { useSidebarState } from '../composables/useSidebarState';
import {
  HomeIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid';

const $route = useRoute();
const { isCollapsed, toggleCollapse, isSidebarOpen, closeSidebar } = useSidebarState();
</script>
