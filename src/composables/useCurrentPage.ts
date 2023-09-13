import { computed } from "vue";
import { useRoute } from "vue-router";

export function useCurrentPage() {
  const currentPage = computed(() => {
    const path = useRoute().path;
    const identifier = path.replace('/', '').toLowerCase();
    return identifier;
  });

  return { currentPage };
}