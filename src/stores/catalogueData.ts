import { defineStore } from 'pinia';

interface State {
  name: string;
  discoverer: string;
  discovererReddit: string;
  image: File | null;
  economy: string;
  glyphs: string;
  coordinates: string;
  size: number;
  tier: string;
  contact: string;
  systemFaction: string;
  saveReloadLocationName: string;
  locationName: string;
}

export const useCatalogueDataStore = defineStore('catalogueData', {
  state: (): State => ({
    name: '',
    discoverer: '',
    discovererReddit: '',
    image: null,
    economy: '',
    glyphs: '',
    coordinates: '',
    size: 0,
    tier: '', // this should be "class"
    contact: '',
    systemFaction: '',
    saveReloadLocationName: '',
    locationName: '',
  }),
});
