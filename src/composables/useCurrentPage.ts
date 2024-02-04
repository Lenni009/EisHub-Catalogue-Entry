import { useRoute } from 'vue-router';
import { computed } from 'vue';

export function useCurrentPage() {
  const route = useRoute();

  const currentPage = computed(() => route?.path?.replace('/', '').toLowerCase());

  return { currentPage };
}
