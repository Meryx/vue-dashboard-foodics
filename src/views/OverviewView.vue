<template>
  <MainLayout>
    <div class="p-6 bg-site-lite dark:bg-site-dark text-charcoal dark:text-soft-gray overflow-auto">
      <section class="flex flex-col items-center mb-8">
        <!-- Placeholder for the logo while it loads -->
        <div
          v-if="!logoLoaded"
          class="h-24 w-24 mb-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"
        ></div>
        <img
          v-show="logoLoaded"
          :src="logoSrc"
          alt="Vue.js Logo"
          class="h-24 w-24 mb-4"
          @load="onLogoLoad"
        />
        <h1 class="text-4xl font-bold">Project Overview</h1>
      </section>

      <!-- Project Description -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">About the Project</h2>
        <p class="text-base leading-relaxed">
          This dashboard application provides insights into posts and comments data fetched from a
          public API. It offers functionalities such as viewing, searching, and analyzing data with
          interactive charts and statistics.
        </p>
      </section>

      <!-- Technologies Used -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Technologies Used</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul class="list-disc list-inside space-y-2">
            <li>
              <strong>Vue.js 3:</strong> The progressive JavaScript framework used for building the
              user interface.
            </li>
            <li>
              <strong>Vue Router:</strong> Handles client-side routing for seamless navigation
              between pages.
            </li>
            <li>
              <strong>Vuex:</strong> State management pattern + library for Vue.js applications.
            </li>
            <li>
              <strong>Chart.js:</strong> Simple yet flexible JavaScript charting for designers &
              developers.
            </li>
          </ul>
          <ul class="list-disc list-inside space-y-2">
            <li>
              <strong>Heroicons:</strong> Beautiful hand-crafted SVG icons, by the makers of
              Tailwind CSS.
            </li>
            <li>
              <strong>JSONPlaceholder API:</strong> A free online REST API used for fetching posts,
              comments, and user data.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> A utility-first CSS framework for styling components
              efficiently.
            </li>
          </ul>
        </div>
      </section>

      <!-- Features -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            :icon="ClipboardDocumentListIcon"
            title="Posts Table"
            description="View and search through a comprehensive list of posts with infinite scrolling and pagination."
          />

          <FeatureCard
            :icon="ChartBarIcon"
            title="Statistics Dashboard"
            description="Analyze data with total counts, longest/shortest posts, average lengths, and interactive charts."
          />

          <FeatureCard
            :icon="DevicePhoneMobileIcon"
            title="Responsive Design"
            description="Ensures optimal user experience across various devices and screen sizes."
          />

          <FeatureCard
            :icon="MoonIcon"
            title="Dark Mode Support"
            description="Toggle between light and dark themes for comfortable viewing."
          />

          <FeatureCard
            :icon="PuzzlePieceIcon"
            title="Modular Components"
            description="Reusable and maintainable components built with Vue's Composition API."
          />

          <FeatureCard
            :icon="BoltIcon"
            title="Performance Optimized"
            description="Efficient data fetching and state management ensure a smooth user experience."
          />
        </div>
      </section>

      <!-- Getting Started -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Getting Started</h2>
        <p class="text-base leading-relaxed">To run this project locally, follow these steps:</p>
        <ol class="list-decimal list-inside space-y-2 mt-4">
          <li>
            Clone the repository:
            <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">
              git clone https://github.com/Meryx/vue-dashboard-foodics.git
            </code>
          </li>
          <li>
            Navigate to the project directory:
            <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">cd vue-dashboard-foodics</code>
          </li>
          <li>
            Install dependencies:
            <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">npm install</code>
          </li>
          <li>
            Start the development server:
            <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">npm run dev</code>
          </li>
        </ol>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import FeatureCard from '@/components/FeatureCard.vue';
import {
  ClipboardDocumentListIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  MoonIcon,
  PuzzlePieceIcon,
  BoltIcon,
} from '@heroicons/vue/24/solid';

const logoSrc = 'https://vuejs.org/images/logo.png';
const logoLoaded = ref(false);

const onLogoLoad = () => {
  logoLoaded.value = true;
};
</script>
