<template>
  <div class="flex">
    <SiteHeader />
    <SiteSidebar />

    <div class="flex-1 p-6">
      <PostsTable />
    </div>
  </div>
</template>

<script setup>
import SiteSidebar from '../components/SiteSidebar.vue';
import PostsTable from '../components/PostsTable.vue';
import SiteHeader from '../components/SiteHeader.vue';
</script>
