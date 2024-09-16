<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 z-10 max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-4">{{ post.title }}</h2>
      <p class="mb-4">{{ post.body }}</p>

      <div v-if="user" class="mb-4">
        <h3 class="text-lg font-semibold">User Information</h3>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <div v-if="comments.length">
        <h3 class="text-lg font-semibold">Comments</h3>
        <ul>
          <li v-for="comment in comments" :key="comment.id" class="mb-2">
            <p class="font-semibold">{{ comment.name }}</p>
            <p>{{ comment.body }}</p>
          </li>
        </ul>
      </div>

      <button @click="close" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { apiService } from '../services/api';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const user = ref(null);
const comments = ref([]);

const fetchUser = async () => {
  try {
    user.value = await apiService.fetchUser(props.post.userId);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const fetchComments = async () => {
  try {
    comments.value = await apiService.fetchComments(props.post.id);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      fetchUser();
      fetchComments();
    }
  },
  { immediate: true }
);

const close = () => {
  emit('close');
};
</script>
