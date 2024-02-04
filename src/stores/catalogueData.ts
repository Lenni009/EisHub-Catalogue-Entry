import { defineStore } from 'pinia';
import type { StellarLocation, MTSubtype, MTType, ShipType, Tiers, FormItem } from '../types/catalogue';
import { albumEntry, discovererParm, addInfoMt, starshipOther, checkNumberString } from '../functions/functions';
import { regions } from '../objects/regions';
import { useIsArtifact } from '@/composables/useIsArtifact';

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
  systemFaction: FormItem<'Korvax' | "Vy'keen" | 'Gek'>;
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
  artifactType: FormItem<
    | 'Ancient Skeleton'
    | 'Aquatic Treasure'
    | 'Biological Sample'
    | 'Delicate Flora (FARM)'
    | 'Delicate Flora (PLNT)'
    | 'Excavated Bones'
    | 'Fossil Sample'
    | 'Historical Document'
    | 'Lost Artifact'
    | 'Salvaged Scrap'
    | 'Terrifying Sample'
    | 'Unearthed Treasure'
  >;
  artifactRarity: FormItem<'Common' | 'Uncommon' | 'Rare'>;
  modifier: FormItem<string>;
  value: FormItem<string>;
  id: FormItem<string>;
  version: 'Echoes';
}

export const useCatalogueDataStore = defineStore('catalogueData', {
  state: (): State => ({
    version: 'Echoes',
    name: {
      isActive: true,
      value: '',
    },
    discoverer: {
      isActive: true,
      value: '',
    },
    discovererReddit: {
      isActive: true,
      value: '',
    },
    file: {
      isActive: true,
      value: null,
    },
    compressedFile: null,
    economy: {
      isActive: true,
      value: '★★★ Economy',
    },
    glyphs: {
      isActive: true,
      isValid: false,
      value: '',
    },
    coordinates: {
      isActive: false,
      isValid: false,
      value: '',
    },
    size: {
      isActive: true,
      isValid: false,
      value: '',
    },
    tier: {
      isActive: true,
      value: 'C', // this should be "class"
    },
    systemFaction: {
      isActive: false,
      value: 'Korvax',
    },
    saveReloadLocationName: {
      isActive: false,
      value: '',
    },
    locationName: {
      isActive: false,
      value: '',
    },
    saveReloadLocationType: {
      isActive: true,
      value: 'space station',
    },
    locationType: {
      isActive: true,
      value: 'space station',
    },
    notes: {
      isActive: true,
      value: '',
    },
    features: {
      isActive: true,
      value: '',
    },
    depth: {
      isActive: true,
      isValid: false,
      value: '',
    },
    stomach: {
      isActive: true,
      value: '',
    },
    subtype: {
      isActive: true,
      value: '',
    },
    slots: {
      isActive: true,
      isValid: false,
      value: '',
    },
    mtType: {
      isActive: true,
      value: 'Standard',
    },
    shipType: {
      isActive: true,
      value: 'Fighter',
    },
    isCrashed: {
      isActive: true,
      value: false,
    },
    artifactType: {
      isActive: true,
      value: 'Ancient Skeleton',
    },
    artifactRarity: {
      isActive: true,
      value: 'Common',
    },
    modifier: {
      isActive: true,
      isValid: false,
      value: '',
    },
    value: {
      isActive: true,
      isValid: false,
      value: '',
    },
    id: {
      isActive: true,
      isValid: false,
      value: '',
    },
  }),

  getters: {
    isValidGlyphs: (state) => useIsArtifact().isArtifact || regions.includes(state.glyphs.value.substring(4)), // NoSonar region glyphs start at index 4. Tests if an address is valid for Eisvana
    isValidDiscoverer: (state) =>
      Boolean(useIsArtifact().isArtifact || state.discoverer.value || state.discovererReddit.value),
    isValidCoords: (state) =>
      /^[+-](?:[0-9]{1,3})\.(?:[0-9]{2}), [+-](?:[0-9]{1,3})\.(?:[0-9]{2})$/.test(state.coordinates.value) ||
      !state.coordinates.value,
    isValidDepth: (state) => checkNumberString(state.depth.value),
    isValidSize: (state) => checkNumberString(state.size.value),
    isValidSlots: (state) => checkNumberString(state.slots.value),
    isValidValue: (state) => checkNumberString(state.value.value),
    isValidModifier: (state) => checkNumberString(state.modifier.value),
    isValidId: (state) => checkNumberString(state.id.value),

    starship: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        starshipOther(
          state.shipType.value,
          state.coordinates.value,
          state.locationName.value,
          state.economy.value,
          state.isCrashed.value,
          state.tier.value
        ),
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value)
      ),
    freighter: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        `<br>${state.economy.value} - ${state.systemFaction.value}`,
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value)
      ),
    frigate: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        state.tier.value,
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value)
      ),
    multitool: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        `<br>{{class|${state.tier.value}}} - ${
          ['Experimental', 'Standard', 'Alien'].includes(state.mtType.value) ? state.subtype.value + ' - ' : ''
        }${state.slots.value} Slots`,
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value),
        addInfoMt(
          state.coordinates.value,
          state.saveReloadLocationName.value,
          state.locationName.value,
          state.saveReloadLocationType.value,
          state.locationType.value
        )
      ),
    creature: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        `(${state.size.value}m)`,
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value)
      ),
    sandworm: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        `(${state.depth.value}ku)<br>Stomach: ${state.stomach.value}`,
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value)
      ),
    flora: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        undefined,
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value)
      ),
    planet: (state) =>
      albumEntry(
        state.compressedFile?.name ?? '',
        state.name.value,
        state.features.value,
        state.glyphs.value,
        discovererParm(state.discovererReddit.value, state.discoverer.value)
      ),
    artifact: (state) =>
      `{{Artifact
        | name = ${state.name.value}
        | image =
        | type = ${state.artifactType.value}
        | rarity = ${state.artifactRarity.value}
        | modifier = ${state.modifier.value}
        | value = ${state.value.value}
        | id = ${state.id.value}
        | release = ${state.version}
        }}`,
  },
});
