import { defineStore } from 'pinia';

interface State {
  name: string;
  discoverer: string;
  discovererReddit: string;
  file: File | null;
  economy: '★★★ Economy' | '★★ Economy' | '★ Economy' | '{{BlackMarket}}' | '★ Economy (Abandoned)';
  glyphs: string;
  coordinates: string;
  size: string;
  tier: 'C' | 'B' | 'A' | 'S';
  systemFaction: 'Korvax' | 'Vy\'keen' | 'Gek';
  saveReloadLocationName: string;
  locationName: string;
  notes: string;
  features: string;
}

export const useCatalogueDataStore = defineStore('catalogueData', {
  state: (): State => ({
    name: '',
    discoverer: '',
    discovererReddit: '',
    file: null,
    economy: '★★★ Economy',
    glyphs: '',
    coordinates: '',
    size: '',
    tier: 'C', // this should be "class"
    systemFaction: 'Korvax',
    saveReloadLocationName: '',
    locationName: '',
    notes: '',
    features: '',
  }),

  getters: {
    isGlyphsValid: (state) => /(?:[0-9A-F]{4})F(?:[89A])55(?:[5-7])C(?:[23])(?:[01F])/.test(state.glyphs) // tests if an address is valid for EisHub

  }
});
