<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ClassSelect from '../components/ClassSelect.vue';

import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import type { MTType } from '../types/catalogue';

const catalogueDataStore = useCatalogueDataStore();
const {
  type,
  subtype,
  slots,
  locationName,
  locationType,
  saveReloadLocationName,
  saveReloadLocationType,
  coordinates,
} = storeToRefs(catalogueDataStore);

const subtypeSelect = ref<HTMLSelectElement | null>();

const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const isOnPlanet = computed(() => locationType.value !== 'space station');
const srIsOnPlanet = computed(() => saveReloadLocationType.value !== 'space station');

const planetaryTools: MTType[] = ['Atlantid', 'Royal', 'Sentinel'];
const tieredMTs: MTType[] = ['Standard', 'Alien', 'Experimental'];

const isInvalidLocation = computed(() => !isOnPlanet.value && planetaryTools.includes(type.value));
const isTieredMT = computed(() => tieredMTs.includes(type.value));

watch(isInvalidLocation, (newValue) => {
  if (newValue) locationType.value = 'planet';
});

watch(type, (newType, oldType) => {
  if (
    (!tieredMTs.includes(newType) && tieredMTs.includes(oldType)) ||
    (newType === 'Experimental' && subtype.value === 'SMG')
  ) {
    subtype.value = '';
  }
});
</script>

<template>
  <div class="input-group">
    <div>
      <ClassSelect />
    </div>
    <div>
      <label>MT Location</label>
      <select v-model="locationType">
        <option
          value="space station"
          v-if="!planetaryTools.includes(type)"
        >
          Space Station
        </option>
        <option value="planet">Planet</option>
        <option value="moon">Moon</option>
      </select>
    </div>

    <div v-show="isOnPlanet">
      <label for="locInput">{{ ucFirst(locationType) }} Name</label>
      <input
        type="text"
        id="locInput"
        v-model="locationName"
      />
    </div>

    <div v-show="isOnPlanet">
      <label for="coordInput">Planetary Coordinates</label>
      <input
        type="text"
        id="coordInput"
        v-model="coordinates"
      />
    </div>

    <div>
      <label>Save/Reload Location</label>
      <select v-model="saveReloadLocationType">
        <option value="space station">Space Station</option>
        <option value="planet">Planet</option>
        <option value="moon">Moon</option>
      </select>
    </div>

    <div v-show="srIsOnPlanet">
      <label for="srInput">Save/Reload {{ ucFirst(saveReloadLocationType) }} Name</label>
      <input
        type="text"
        id="srInput"
        v-model="saveReloadLocationName"
      />
    </div>

    <div>
      <label for="slots">Slot Count</label>
      <input
        type="text"
        id="slots"
        v-model="slots"
      />
    </div>

    <div>
      <label>Type</label>
      <select v-model="type">
        <option value="Standard">Standard</option>
        <option value="Starter Pistol">Starter Pistol</option>
        <option value="Experimental">Experimental</option>
        <option value="Alien">Alien</option>
        <option value="Royal">Royal</option>
        <option value="Sentinel">Sentinel</option>
        <option value="Atlantid">Atlantid</option>
      </select>
    </div>

    <div v-show="isTieredMT">
      <label>Subtype</label>
      <select
        v-model="subtype"
        ref="subtypeSelect"
      >
        <option
          v-if="isTieredMT"
          value="Rifle"
        >
          Rifle (Large)
        </option>
        <option
          v-if="type !== 'Experimental'"
          value="SMG"
        >
          SMG (Medium)
        </option>
        <option
          v-if="isTieredMT"
          value="Pistol"
        >
          Pistol (Small)
        </option>
      </select>
    </div>
  </div>
</template>
