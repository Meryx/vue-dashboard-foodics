<template>
  <div class="flex h-screen overflow-hidden">
    <SiteSidebar />
    <div :class="['flex flex-col flex-1']">
      <SiteHeader />
      <div class="flex-1 overflow-y-auto">
        <PostsTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import SiteSidebar from '../components/SiteSidebar.vue';
import SiteHeader from '../components/SiteHeader.vue';
import PostsTable from '../components/PostsTable.vue';
</script>
