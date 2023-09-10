import { defineStore } from 'pinia';

interface State {
  requiredFields: string[];
  contact: string;
}

const requiredFields: string[] = ['contact', 'name', 'glyphs', 'file', 'discoverer'];

export const usePersistentDataStore = defineStore('persistentData', {
  state: (): State => ({
    requiredFields: structuredClone(requiredFields),
    contact: '',
  }),

  actions: {
    resetRequiredFields() {
      this.requiredFields = structuredClone(requiredFields);
    }
  }

});
