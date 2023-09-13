import { useRoute } from "vue-router";

export function useCurrentPage() {
  const path = useRoute().path;
  const currentPage = path.replace('/', '').toLowerCase();

  return { currentPage };
}