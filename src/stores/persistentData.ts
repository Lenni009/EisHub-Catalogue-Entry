import { defineStore } from 'pinia';
import type { FormItem } from '../types/catalogue';

interface State {
  requiredFields: string[];
  contact: FormItem<string>;
  submittedEntries: Set<string>;
  catalogueUrl: string;
}

export const usePersistentDataStore = defineStore('persistentData', {
  state: (): State => ({
    requiredFields: [],
    contact: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    submittedEntries: new Set(),
    catalogueUrl: '',
  }),
});
