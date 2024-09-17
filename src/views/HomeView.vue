<template>
  <div class="flex h-screen overflow-hidden">
    <SiteSidebar />
    <div class="flex flex-col flex-1">
      <SiteHeader />
      <div class="relative flex-1 overflow-hidden">
        <div class="absolute inset-0 p-6 overflow-y-auto">
          <PostsTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SiteSidebar from '../components/SiteSidebar.vue';
import SiteHeader from '../components/SiteHeader.vue';
import PostsTable from '../components/PostsTable.vue';
</script>
