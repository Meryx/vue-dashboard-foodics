<template>
  <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-6 flex flex-col items-start">
    <component :is="icon" class="h-8 w-8 text-bright-blue mb-4" />
    <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
      {{ title }}
    </h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
