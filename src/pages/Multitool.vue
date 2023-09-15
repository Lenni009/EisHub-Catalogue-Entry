<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import ClassSelect from '../components/ClassSelect.vue';
import CoordinateInput from '../components/CoordinateInput.vue';
import LocationPlanetInput from '../components/LocationPlanetInput.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import type { MTType } from '../types/catalogue';
import { ucFirst } from '../functions/functions';

const catalogueDataStore = useCatalogueDataStore();
const {
  mtType,
  subtype,
  slots,
  locationType,
  saveReloadLocationName,
  saveReloadLocationType,
  coordinates,
  locationName,
} = storeToRefs(catalogueDataStore);

const subtypeSelect = ref<HTMLSelectElement | null>();

const isOnPlanet = computed(() => locationType.value.value !== 'space station');
const srIsOnPlanet = computed(() => saveReloadLocationType.value.value !== 'space station');

watchEffect(() => {
  coordinates.value.isActive = isOnPlanet.value;
  locationName.value.isActive = isOnPlanet.value;
});

watchEffect(() => (saveReloadLocationName.value.isActive = srIsOnPlanet.value));

const planetaryTools: MTType[] = ['Atlantid', 'Royal', 'Sentinel'];
const tieredMTs: MTType[] = ['Standard', 'Alien', 'Experimental'];

const isInvalidLocation = computed(() => !isOnPlanet.value && planetaryTools.includes(mtType.value.value));
const isTieredMT = computed(() => tieredMTs.includes(mtType.value.value));

watch(isInvalidLocation, (newValue) => {
  if (newValue) locationType.value.value = 'planet';
});

watch(mtType, (newType, oldType) => {
  if (
    (!tieredMTs.includes(newType.value) && tieredMTs.includes(oldType.value)) ||
    (newType.value === 'Experimental' && subtype.value.value === 'SMG')
  ) {
    subtype.value.value = '';
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
      <select v-model="locationType.value">
        <option
          value="space station"
          v-if="!planetaryTools.includes(mtType.value)"
        >
          Space Station
        </option>
        <option value="planet">Planet</option>
        <option value="moon">Moon</option>
      </select>
    </div>

    <div v-show="locationName.isActive">
      <LocationPlanetInput :locationType="locationType.value" />
    </div>

    <div v-show="coordinates.isActive">
      <CoordinateInput />
    </div>
    <div>
      <label>Save/Reload Location</label>
      <select v-model="saveReloadLocationType.value">
        <option value="space station">Space Station</option>
        <option value="planet">Planet</option>
        <option value="moon">Moon</option>
      </select>
    </div>

    <div v-show="saveReloadLocationName.isActive">
      <label for="srInput">Save/Reload {{ ucFirst(saveReloadLocationType.value) }} Name</label>
      <input
        type="text"
        id="srInput"
        v-model="saveReloadLocationName.value"
      />
    </div>

    <div>
      <label for="slots">Slot Count</label>
      <input
        type="text"
        id="slots"
        v-model="slots.value"
      />
    </div>

    <div>
      <label>Type</label>
      <select v-model="mtType.value">
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
        v-model="subtype.value"
        ref="subtypeSelect"
      >
        <option
          v-if="isTieredMT"
          value="Rifle"
        >
          Rifle (Large)
        </option>
        <option
          v-if="mtType.value !== 'Experimental'"
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
