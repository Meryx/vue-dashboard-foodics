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
          <ChevronDoubleLeftIcon v-if="!isCollapsed" class="h-6 w-6" />
          <ChevronDoubleRightIcon v-else class="h-6 w-6" />
        </button>
        <!-- Close Sidebar Button for Mobile -->
        <button
          v-if="!isCollapsed"
          @click="closeSidebar"
          class="ml-2 text-charcoal dark:text-soft-gray focus:outline-none md:hidden"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-3 space-y-2">
      <NavLink to="/" label="Overview" :isCollapsed="isCollapsed">
        <HomeIcon class="h-6 w-6" />
      </NavLink>

      <NavLink to="/posts" label="Posts" :isCollapsed="isCollapsed">
        <ClipboardDocumentListIcon class="h-6 w-6" />
      </NavLink>

      <NavLink to="/statistics" label="Statistics" :isCollapsed="isCollapsed">
        <ChartBarIcon class="h-6 w-6" />
      </NavLink>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import {
  HomeIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid';
import NavLink from '@/components/NavLink.vue';

const store = useStore();

const isCollapsed = computed(() => store.getters['ui/isCollapsed']);
const isSidebarOpen = computed(() => store.getters['ui/isSidebarOpen']);

const toggleCollapse = () => {
  store.dispatch('ui/toggleCollapse');
};

const closeSidebar = () => {
  store.dispatch('ui/closeSidebar');
};
</script>
