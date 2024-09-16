import { ref } from 'vue';

const isCollapsed = ref(false);

export function useSidebarState() {
  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value;
  }

  return {
    isCollapsed,
    toggleSidebar,
  };
}
