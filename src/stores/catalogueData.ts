import { defineStore } from 'pinia';
import type { StellarLocation, MTSubtype, MTType, ShipType, Tiers, FormItem } from '../types/catalogue';
import { albumEntry, discovererParm, addInfoMt, starshipOther } from '../functions/functions';

interface State {
  name: FormItem<string>;
  discoverer: FormItem<string>;
  discovererReddit: FormItem<string>;
  file: FormItem<File | null>;
  compressedFile: File | null;
  economy: FormItem<'★★★ Economy' | '★★ Economy' | '★ Economy' | '{{BlackMarket}}' | '★ Economy (Abandoned)'>;
  glyphs: FormItem<string>;
  coordinates: FormItem<string>;
  size: FormItem<string>;
  tier: FormItem<Tiers>;
  systemFaction: FormItem<'Korvax' | 'Vy\'keen' | 'Gek'>;
  saveReloadLocationName: FormItem<string>;
  locationName: FormItem<string>;
  saveReloadLocationType: FormItem<StellarLocation>;
  locationType: FormItem<StellarLocation>;
  notes: FormItem<string>;
  features: FormItem<string>;
  depth: FormItem<string>;
  stomach: FormItem<string>;
  slots: FormItem<string>;
  subtype: FormItem<MTSubtype>;
  mtType: FormItem<MTType>;
  shipType: FormItem<ShipType>;
  isCrashed: FormItem<boolean>;
}

export const useCatalogueDataStore = defineStore('catalogueData', {
  state: (): State => ({
    name: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    discoverer: {
      isActive: true,
      isRequired: false,
      value: '',
    },
    discovererReddit: {
      isActive: true,
      isRequired: false,
      value: '',
    },
    file: {
      isActive: true,
      isRequired: true,
      value: null,
    },
    compressedFile: null,
    economy: {
      isActive: true,
      isRequired: true,
      value: '★★★ Economy',
    },
    glyphs: {
      isRequired: true,
      isActive: true,
      value: '',
    },
    coordinates: {
      isRequired: false,
      isActive: true,
      value: '',
    },
    size: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    tier: {
      isActive: true,
      isRequired: true,
      value: 'C', // this should be "class"
    },
    systemFaction: {
      isActive: false,
      isRequired: true,
      value: 'Korvax',
    },
    saveReloadLocationName: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    locationName: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    saveReloadLocationType: {
      isActive: true,
      isRequired: true,
      value: 'space station',
    },
    locationType: {
      isActive: false,
      isRequired: true,
      value: 'space station',
    },
    notes: {
      isActive: true,
      isRequired: false,
      value: '',
    },
    features: {
      isActive: true,
      isRequired: false,
      value: '',
    },
    depth: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    stomach: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    subtype: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    slots: {
      isActive: true,
      isRequired: true,
      value: '',
    },
    mtType: {
      isActive: true,
      isRequired: true,
      value: 'Standard',
    },
    shipType: {
      isActive: true,
      isRequired: true,
      value: 'Fighter',
    },
    isCrashed: {
      isActive: true,
      isRequired: false,
      value: false,
    },
  }),

  getters: {
    isValidGlyphs: (state) => /(?:[0-9A-F]{4})F(?:[89A])55(?:[5-7])C(?:[23])(?:[01F])/.test(state.glyphs.value), // tests if an address is valid for EisHub
    isValidCatalogueData: (state) => (Object.values(state).filter(item => item.isRequired && item.isActive)).every(item => item.value),
    isValidDiscoverer: (state) => (state.discoverer.value || state.discovererReddit.value),

    starship: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, starshipOther(state.shipType.value, state.coordinates.value, state.locationName.value, state.economy.value, state.isCrashed.value, state.tier.value), state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value)),
    freighter: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, `<br>${state.economy.value} - ${state.systemFaction.value}`, state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value)),
    frigate: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, state.tier.value, state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value)),
    multitool: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, `<br>{{class|${state.tier.value}}} - ${(['Experimental', 'Standard', 'Alien']).includes(state.mtType.value) ? state.subtype.value + ' - ' : ''}${state.slots.value} Slots`, state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value), addInfoMt(state.coordinates.value, state.saveReloadLocationName.value, state.locationName.value, state.saveReloadLocationType.value, state.locationType.value)),
    creature: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, `(${state.size.value}m)`, state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value)),
    sandworm: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, `(${state.depth.value}ku)<br>Stomach: ${state.stomach.value}`, state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value)),
    flora: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, undefined, state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value)),
    planet: (state) => albumEntry(state.compressedFile?.name ?? '', state.name.value, state.features.value, state.glyphs.value, discovererParm(state.discovererReddit.value, state.discoverer.value)),
  }
});
