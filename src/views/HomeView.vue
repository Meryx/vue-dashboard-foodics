<template>
  <div class="flex">
    <Sidebar />

    <div class="flex-1 p-6">
      <PostsTable />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/SiteSidebar.vue';
import PostsTable from '../components/PostsTable.vue';
</script>
