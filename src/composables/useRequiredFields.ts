import { computed, reactive } from 'vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';
import { useIsArtifact } from '@/composables/useIsArtifact';

export function useRequiredFields() {
  const catalogueDataStore = useCatalogueDataStore();
  const {
    name,
    file,
    economy,
    coordinates,
    size,
    tier,
    systemFaction,
    saveReloadLocationName,
    locationName,
    saveReloadLocationType,
    locationType,
    features,
    depth,
    stomach,
    subtype,
    slots,
    mtType,
    shipType,
    isValidDiscoverer,
    artifactType,
    artifactRarity,
    modifier,
    value,
    id,
    isValidGlyphs,
  } = storeToRefs(catalogueDataStore);

  const persistentDataStore = usePersistentDataStore();
  const { contact, requiredFields } = storeToRefs(persistentDataStore);

  const { isArtifact } = useIsArtifact();

  const fields: {
    [key: string]: {
      [key: string]: string | File | null | boolean;
    };
  } = reactive({
    name,
    file,
    economy,
    coordinates,
    size,
    tier,
    systemFaction,
    saveReloadLocationName,
    locationName,
    saveReloadLocationType,
    locationType,
    features,
    depth,
    stomach,
    subtype,
    slots,
    mtType,
    shipType,
    contact,
    artifactType,
    artifactRarity,
    modifier,
    value,
    id,
  });

  const standardFields: string[] = ['contact', 'name', 'file', ...requiredFields.value];

  const isValidData = computed(
    () =>
      standardFields
        .filter((field) => fields[field].isActive)
        .every((field) => fields[field].value && fields[field].isValid !== false) &&
      ((isValidDiscoverer.value && isValidGlyphs.value) || isArtifact.value)
  );

  return { isValidData };
}
