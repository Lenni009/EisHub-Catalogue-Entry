import { useCurrentPage } from './useCurrentPage';

export function useIsArtifact() {
  const { currentPage } = useCurrentPage();
  const isArtifact = currentPage === 'artifact';

  return { isArtifact };
}
