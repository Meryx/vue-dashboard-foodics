<template>
  <div class="mt-4">
    <div class="hidden md:flex justify-between items-center">
      <!-- Bottom Left: Showing x–y of z posts -->
      <div class="text-charcoal dark:text-soft-gray">
        {{ startItem }}–{{ endItem }} of {{ totalItems }}
      </div>
      <!-- Bottom Right: Pagination Buttons -->
      <div class="flex flex-col">
        <div class="flex items-center space-x-2">
          <PaginationButton :onClick="goToFirstPage" :disabled="currentPage === 1">
            <ChevronDoubleLeftIcon class="h-6 w-6" />
          </PaginationButton>
          <PaginationButton :onClick="prevPage" :disabled="currentPage === 1">
            <ChevronLeftIcon class="h-6 w-6" />
          </PaginationButton>

          <PaginationButton :onClick="nextPage" :disabled="currentPage === totalPages">
            <ChevronRightIcon class="h-6 w-6" />
          </PaginationButton>

          <PaginationButton :onClick="goToLastPage" :disabled="currentPage === totalPages">
            <ChevronDoubleRightIcon class="h-6 w-6" />
          </PaginationButton>
        </div>
        <!-- Page Indicator -->
        <div class="text-charcoal dark:text-soft-gray py-2">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PaginationButton from './PaginationButton.vue';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/vue/24/solid';

defineProps({
  currentPage: Number,
  totalPages: Number,
  startItem: Number,
  endItem: Number,
  totalItems: Number,
});

const emit = defineEmits(['goToFirstPage', 'prevPage', 'nextPage', 'goToLastPage', 'resetScroll']);

const goToFirstPage = () => {
  emit('goToFirstPage');
  emit('resetScroll');
};

const prevPage = () => {
  emit('prevPage');
  emit('resetScroll');
};

const nextPage = () => {
  emit('nextPage');
  emit('resetScroll');
};

const goToLastPage = () => {
  emit('goToLastPage');
  emit('resetScroll');
};
</script>
