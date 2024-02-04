import { computed } from 'vue';
import { useCurrentPage } from './useCurrentPage';

export function useIsArtifact() {
  const { currentPage } = useCurrentPage();
  const isArtifact = computed(() => currentPage.value === 'artifact');

  return { isArtifact };
}
