import { reactive } from "vue";
import { useCatalogueDataStore } from '../stores/catalogueData';
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from "pinia";

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
  } = storeToRefs(catalogueDataStore);

  const persistentDataStore = usePersistentDataStore();
  const { contact, requiredFields } = storeToRefs(persistentDataStore);

  const fields: {
    [key: string]: {
      [key: string]: string | File | null | boolean
    }
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
  });

  const standardFields: string[] = ['contact', 'name', 'file', ...requiredFields.value];

  const isValidData = standardFields.filter((field) => fields[field].isActive).every(field => fields[field].value && fields[field].isValid !== false) && isValidDiscoverer.value;

  return { isValidData };
}