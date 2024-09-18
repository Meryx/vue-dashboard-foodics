<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-xl font-semibold mb-4 text-charcoal dark:text-soft-gray text-center">
      Histogram of Post Lengths (n = {{ totalPosts }})
    </h2>
    <div class="flex-grow relative">
      <Bar
        v-if="dataAvailable"
        :data="chartData"
        :options="chartOptions"
        class="absolute inset-0"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <p class="text-charcoal dark:text-soft-gray">Loading post lengths...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const store = useStore();

store.dispatch('posts/fetchPosts');

const posts = computed(() => store.getters['posts/allPosts']);
const isLoadingPosts = computed(() => store.getters['posts/isLoading']);

const chartData = ref(null);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'Post Length',
        font: { size: 14, weight: 'bold' },
      },
      min: 100,
      max: 240,
      ticks: {
        stepSize: 20,
        callback: (value) => value,
      },
      grid: { display: false },
    },
    y: {
      title: {
        display: true,
        text: 'Frequency',
        font: { size: 14, weight: 'bold' },
      },
      beginAtZero: true,
      grid: {
        display: false,
        borderDash: [2],
      },
    },
  },
  elements: {
    bar: { borderWidth: 1, borderRadius: 0 },
  },
  barPercentage: 1.0,
  categoryPercentage: 1.0,
};

const bins = [
  { start: 100, end: 119 },
  { start: 120, end: 139 },
  { start: 140, end: 159 },
  { start: 160, end: 179 },
  { start: 180, end: 199 },
  { start: 200, end: 219 },
  { start: 220, end: 239 },
];

const binPostLengths = (lengths) => {
  return bins.map((bin) => ({
    ...bin,
    count: lengths.filter((length) => length >= bin.start && length <= bin.end).length,
    center: (bin.start + bin.end) / 2,
  }));
};

const postLengths = computed(() => posts.value.map((post) => post.body.length));

const totalPosts = computed(() => postLengths.value.length);

watch(
  postLengths,
  (newPostLengths) => {
    if (newPostLengths.length > 0) {
      const binnedData = binPostLengths(newPostLengths);
      const datasetData = binnedData.map((bin) => ({
        x: bin.center,
        y: bin.count,
      }));

      chartData.value = {
        datasets: [
          {
            label: 'Number of Posts',
            data: datasetData,
            backgroundColor: '#3b82f7cc',
            borderColor: '#3b82f7',
            borderWidth: 1,
          },
        ],
      };
    }
  },
  { immediate: true }
);

const isLoading = computed(() => isLoadingPosts.value);
const dataAvailable = computed(() => !isLoading.value && postLengths.value.length > 0);
</script>
