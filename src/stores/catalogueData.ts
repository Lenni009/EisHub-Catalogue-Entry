import { defineStore } from 'pinia';

interface State {
  name: string;
  discoverer: string;
  discovererReddit: string;
  image: File;
  economy: string;
  glyphs: string;
  coordinates: string;
  size: number;
  tier: string;
  contact: string;

  saveReloadLocation: string;
  mtLocation: string;
}

export const useCatalogueDataStore = defineStore('catalogueData', {
  state: (): State => ({
    name: '',
    discoverer: '',
    discovererReddit: '',
    image: '',
    economy: '',
    glyphs: '',
    coordinates: '',
    size: 0,
    tier: '', // this should be "class"
    contact: '',

    saveReloadLocation: '',
    mtLocation: '',
  }),
});
