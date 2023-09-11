import { defineStore } from 'pinia';
import type { StellarLocation, MTSubtype, MTType } from '../types/catalogue';
import { albumEntry, discovererParm, addInfoMt } from '../functions/functions';

interface State {
  name: string;
  discoverer: string;
  discovererReddit: string;
  file: File | null;
  compressedFile: File | null;
  economy: '★★★ Economy' | '★★ Economy' | '★ Economy' | '{{BlackMarket}}' | '★ Economy (Abandoned)';
  glyphs: string;
  coordinates: string;
  size: string;
  tier: 'C' | 'B' | 'A' | 'S';
  systemFaction: 'Korvax' | 'Vy\'keen' | 'Gek';
  saveReloadLocationName: string;
  locationName: string;
  saveReloadLocationType: StellarLocation;
  locationType: StellarLocation;
  notes: string;
  features: string;
  depth: string;
  stomach: string;
  slots: string;
  subtype: MTSubtype;
  type: MTType;
}

export const useCatalogueDataStore = defineStore('catalogueData', {
  state: (): State => ({
    name: '',
    discoverer: '',
    discovererReddit: '',
    file: null,
    compressedFile: null,
    economy: '★★★ Economy',
    glyphs: '',
    coordinates: '',
    size: '',
    tier: 'C', // this should be "class"
    systemFaction: 'Korvax',
    saveReloadLocationName: '',
    locationName: '',
    saveReloadLocationType: 'space station',
    locationType: 'space station',
    notes: '',
    features: '',
    depth: '',
    stomach: '',
    subtype: '',
    slots: '',
    type: 'Standard'
  }),

  getters: {
    isGlyphsValid: (state) => /(?:[0-9A-F]{4})F(?:[89A])55(?:[5-7])C(?:[23])(?:[01F])/.test(state.glyphs), // tests if an address is valid for EisHub

    starship: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, `<br>${state.economy}`, state.glyphs, discovererParm(state.discovererReddit, state.discoverer)),
    freighter: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, `<br>${state.economy} - ${state.systemFaction}`, state.glyphs, discovererParm(state.discovererReddit, state.discoverer)),
    frigate: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, state.tier, state.glyphs, discovererParm(state.discovererReddit, state.discoverer)),
    multitool: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, `<br>{{class|${state.tier}}} - ${(['Experimental', 'Standard', 'Alien']).includes(state.type) ? state.subtype + ' - ' : ''}${state.slots} Slots`, state.glyphs, discovererParm(state.discovererReddit, state.discoverer), addInfoMt(state.coordinates, state.saveReloadLocationName, state.locationName, state.saveReloadLocationType, state.locationType)),
    creature: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, `(${state.size}m)`, state.glyphs, discovererParm(state.discovererReddit, state.discoverer)),
    sandworm: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, `(${state.depth}ku) < br > Stomach: ${state.stomach}`, state.glyphs, discovererParm(state.discovererReddit, state.discoverer)),
    flora: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, undefined, state.glyphs, discovererParm(state.discovererReddit, state.discoverer)),
    planet: (state) => albumEntry(state.compressedFile?.name ?? '', state.name, state.features, state.glyphs, discovererParm(state.discovererReddit, state.discoverer)),
  }
});
