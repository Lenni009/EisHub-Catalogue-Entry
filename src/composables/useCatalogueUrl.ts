import { onMounted, onUnmounted } from "vue";
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';

const persistentDataStore = usePersistentDataStore();
const { catalogueUrl } = storeToRefs(persistentDataStore);

export function useCatalogueUrl(url: string) {
  onMounted(() => (catalogueUrl.value = url));
  onUnmounted(() => (catalogueUrl.value = ''));
}