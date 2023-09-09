import { defineStore } from 'pinia';

interface State {
  name: string;
  discoverer: string;
  discovererReddit: string;
  file: File | null;
  economy: string;
  glyphs: string;
  coordinates: string;
  size: string;
  tier: string;
  contact: string;
  systemFaction: string;
  saveReloadLocationName: string;
  locationName: string;
  notes: string;
}

export const useCatalogueDataStore = defineStore('catalogueData', {
  state: (): State => ({
    name: '',
    discoverer: '',
    discovererReddit: '',
    file: null,
    economy: '',
    glyphs: '',
    coordinates: '',
    size: '',
    tier: '', // this should be "class"
    contact: '',
    systemFaction: '',
    saveReloadLocationName: '',
    locationName: '',
    notes: '',
  }),

  getters: {
    isGlyphsValid: (state) => /(?:[0-9A-F]{4})F(?:[89A])55(?:[5-7])C(?:[23])(?:[01F])/.test(state.glyphs) // tests if an address is valid for EisHub

  }
});
