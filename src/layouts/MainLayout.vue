<template>
  <div class="flex h-screen overflow-hidden">
    <SiteSidebar />
    <div class="flex flex-col flex-1">
      <SiteHeader />
      <slot />
    </div>
  </div>
</template>

<script setup>
import SiteSidebar from '@/components/SiteSidebar.vue';
import SiteHeader from '@/components/SiteHeader.vue';
</script>
