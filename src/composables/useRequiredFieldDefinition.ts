import { onMounted, onUnmounted } from "vue";
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';

export function useRequiredFieldDefinition(fields: string[]) {

  const persistentDataStore = usePersistentDataStore();
  const { requiredFields } = storeToRefs(persistentDataStore);

  onMounted(() => (requiredFields.value.push(...fields)));
  onUnmounted(() => (requiredFields.value = []));
}