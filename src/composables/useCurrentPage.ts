import { useRoute } from 'vue-router';

export function useCurrentPage() {
  const route = useRoute();
  const path = route?.path;
  const currentPage = path?.replace('/', '').toLowerCase();

  return { currentPage };
}
