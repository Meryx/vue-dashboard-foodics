import { ref, watch, onMounted } from 'vue';

export function useTheme() {
  const isDarkMode = ref(false);

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
  }

  onMounted(() => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  watch(
    isDarkMode,
    (newVal) => {
      if (newVal) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
    { immediate: true }
  );

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
