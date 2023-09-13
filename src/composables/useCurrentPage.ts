import { computed } from "vue";
import router from "../router";

export function useCurrentPage() {
  const currentPage = computed(() => {
    const path = router.currentRoute.value.path;
    const identifier = path.replace('/', '').toLowerCase();
    return identifier;
  });

  return { currentPage };
}