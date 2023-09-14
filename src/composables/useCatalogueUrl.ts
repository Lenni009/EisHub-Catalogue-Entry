import { onMounted, onUnmounted } from "vue";
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';

export function useCatalogueUrl(url: string) {

  const persistentDataStore = usePersistentDataStore();
  const { catalogueUrl } = storeToRefs(persistentDataStore);

  onMounted(() => (catalogueUrl.value = url));
  onUnmounted(() => (catalogueUrl.value = ''));
}