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
import { usePostLengthInsights } from '../composables/usePostLengthInsights';
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

const { postLengths } = usePostLengthInsights();

const totalPosts = computed(() => postLengths.value.length);

const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'Post Length',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      min: 100,
      max: 240,
      ticks: {
        stepSize: 20,
        callback: function (value) {
          return value;
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: 'Frequency',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      beginAtZero: true,
      grid: {
        display: false,
        borderDash: [2],
      },
    },
  },

  elements: {
    bar: {
      borderWidth: 1,
      borderRadius: 0,
    },
  },

  barPercentage: 1.0,
  categoryPercentage: 1.0,
});

const dataAvailable = ref(false);

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
  const binnedData = bins.map((bin) => ({
    ...bin,
    count: 0,
    center: (bin.start + bin.end) / 2,
  }));

  lengths.forEach((length) => {
    for (const bin of binnedData) {
      if (length >= bin.start && length <= bin.end) {
        bin.count++;
        break;
      }
    }
  });

  return binnedData;
};

watch(
  () => postLengths.value,
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
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
        ],
      };
      dataAvailable.value = true;
    } else {
      dataAvailable.value = false;
    }
  },
  { immediate: true }
);
</script>
