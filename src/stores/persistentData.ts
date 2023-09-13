import { defineStore } from 'pinia';

interface State {
  requiredFields: string[];
  contact: string;
  submittedEntries: Set<string>;
  catalogueUrl: string;
}

const requiredFields: string[] = ['contact', 'name', 'glyphs', 'file', 'discoverer'];

export const usePersistentDataStore = defineStore('persistentData', {
  state: (): State => ({
    requiredFields: structuredClone(requiredFields),
    contact: '',
    submittedEntries: new Set(),
    catalogueUrl: '',
  }),

  actions: {
    resetRequiredFields() {
      this.requiredFields = structuredClone(requiredFields);
    }
  }
});
