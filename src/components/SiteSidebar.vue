<template>
  <div
    v-if="isSidebarOpen"
    class="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
    @click="closeSidebar"
  ></div>

  <div
    :class="[
      'fixed z-40 inset-y-0 left-0 overflow-y-auto md:transition-width duration-300 transform bg-light-gray dark:bg-dark-gray shadow-right',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static md:inset-0',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <div
      :class="['flex items-center px-4 py-4', isCollapsed ? 'justify-center' : 'justify-between']"
    >
      <span v-if="!isCollapsed" class="text-charcoal dark:text-soft-gray text-xl font-semibold"
        >Foodics</span
      >
      <button
        @click="closeSidebar"
        class="text-charcoal dark:text-soft-gray focus:outline-none md:hidden"
      >
        <ChevronDoubleLeftIcon v-if="!isCollapsed" class="h-6 w-6" />
      </button>
      <button
        @click="toggleCollapse"
        class="text-charcoal dark:text-soft-gray focus:outline-none hidden md:block"
      >
        <ChevronDoubleLeftIcon v-if="!isCollapsed" class="h-6 w-6" />
        <ChevronDoubleRightIcon v-else class="h-6 w-6" />
      </button>
    </div>
    <nav class="flex-1 px-3 space-y-2">
      <router-link
        to="/"
        class="flex items-center px-4 py-2 rounded-md text-charcoal dark:text-soft-gray hover:bg-soft-gray dark:hover:bg-medium-gray"
        :class="{ 'bg-soft-gray dark:bg-medium-gray': $route.path === '/' }"
      >
        <HomeIcon class="h-6 w-6" />

        <span v-if="!isCollapsed" class="ml-3">Home</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSidebarState } from '../composables/useSidebarState';
import { HomeIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/solid';

const $route = useRoute();
const { isCollapsed, toggleCollapse, isSidebarOpen, closeSidebar } = useSidebarState();
</script>
