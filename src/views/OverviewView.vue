<template>
  <MainLayout>
    <div class="p-6 bg-site-lite dark:bg-site-dark text-charcoal dark:text-soft-gray overflow-auto">
      <!-- Header Section with Vue.js Logo -->
      <section class="flex flex-col items-center mb-8">
        <img src="https://vuejs.org/images/logo.png" alt="Vue.js Logo" class="h-24 w-24 mb-4" />
        <h1 class="text-4xl font-bold">Project Overview</h1>
      </section>

      <!-- Project Description -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">About the Project</h2>
        <p class="text-base leading-relaxed">
          This dashboard application is designed to provide insights into posts and comments data
          fetched from a public API. It offers functionalities such as viewing, searching, and
          analyzing data with interactive charts and statistics.
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
              <strong>Tailwind CSS:</strong> A utility-first CSS framework for styling components
              efficiently.
            </li>
          </ul>
          <ul class="list-disc list-inside space-y-2">
            <li>
              <strong>Heroicons:</strong> Provides a set of free MIT-licensed high-quality SVG icons
              for interface design.
            </li>
            <li>
              <strong>Composition API:</strong> Enhances code organization and reusability with
              composable functions.
            </li>
            <li>
              <strong>JSONPlaceholder API:</strong> A free online REST API used for fetching posts,
              comments, and user data.
            </li>
          </ul>
        </div>
      </section>

      <!-- Features -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-6">
            <ClipboardDocumentListIcon class="h-8 w-8 text-bright-blue mb-4" />
            <h3 class="text-xl font-semibold mb-2">Posts Table</h3>
            <p>
              View and search through a comprehensive list of posts with infinite scrolling and
              pagination.
            </p>
          </div>
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-6">
            <ChartBarIcon class="h-8 w-8 text-bright-blue mb-4" />
            <h3 class="text-xl font-semibold mb-2">Statistics Dashboard</h3>
            <p>
              Analyze data with total counts, longest/shortest posts, average lengths, and
              interactive charts.
            </p>
          </div>
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-6">
            <DevicePhoneMobileIcon class="h-8 w-8 text-bright-blue mb-4" />
            <h3 class="text-xl font-semibold mb-2">Responsive Design</h3>
            <p>Ensures optimal user experience across various devices and screen sizes.</p>
          </div>
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-6">
            <MoonIcon class="h-8 w-8 text-bright-blue mb-4" />
            <h3 class="text-xl font-semibold mb-2">Dark Mode Support</h3>
            <p>Toggle between light and dark themes for comfortable viewing.</p>
          </div>
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-6">
            <PuzzlePieceIcon class="h-8 w-8 text-bright-blue mb-4" />
            <h3 class="text-xl font-semibold mb-2">Modular Components</h3>
            <p>Reusable and maintainable components built with Vue's Composition API.</p>
          </div>
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-6">
            <BoltIcon class="h-8 w-8 text-bright-blue mb-4" />
            <h3 class="text-xl font-semibold mb-2">Performance Optimized</h3>
            <p>Efficient data fetching and state management ensure a smooth user experience.</p>
          </div>
        </div>
      </section>

      <!-- Getting Started -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Getting Started</h2>
        <p class="text-base leading-relaxed">To run this project locally, follow these steps:</p>
        <ol class="list-decimal list-inside space-y-2 mt-4">
          <li>
            Clone the repository:
            <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded"
              >git clone https://github.com/Meryx/vue-dashboard-foodics.git</code
            >
          </li>
          <li>
            Navigate to the project directory:
            <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">vue-dashboard-foodics</code>
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
import MainLayout from '../layouts/MainLayout.vue';
import {
  ClipboardDocumentListIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  MoonIcon,
  PuzzlePieceIcon,
  BoltIcon,
} from '@heroicons/vue/24/solid';
</script>
