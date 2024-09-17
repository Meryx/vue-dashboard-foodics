import { ref } from 'vue';

const isCollapsed = ref(false);
const isSidebarOpen = ref(false);

export function useSidebarState() {
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  function closeSidebar() {
    isSidebarOpen.value = false;
  }

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
  }

  return {
    isCollapsed,
    toggleCollapse,
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
  };
}
