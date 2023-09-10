<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import ClassSelect from '../components/ClassSelect.vue';

import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import type { MTSubtype } from '../types/catalogue';

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

watch(type, () => {
  if (!(subtypeSelect.value instanceof HTMLSelectElement)) return;

  nextTick(() => {
    if (!subtypeSelect.value) return;
    const currentValue = subtypeSelect.value.value;

    const validValues: MTSubtype[] = ['Rifle', 'SMG', 'Pistol', ''];

    if (!validValues.includes(currentValue as MTSubtype)) return;

    subtype.value = currentValue as MTSubtype;
  });
});

const isTieredMT = computed(() => ['Standard', 'Experimental', 'Alien'].includes(type.value));
</script>

<template>
  <div class="input-group">
    <div>
      <ClassSelect />
    </div>
    <div>
      <label>MT Location</label>
      <select v-model="locationType">
        <option value="planet">Planet</option>
        <option value="moon">Moon</option>
        <option value="space station">Space Station</option>
      </select>
    </div>

    <div>
      <label for="locInput">Planet Name</label>
      <input
        type="text"
        id="locInput"
        v-model="locationName"
      />
    </div>

    <div>
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
        <option value="planet">Planet</option>
        <option value="moon">Moon</option>
        <option value="space station">Space Station</option>
      </select>
    </div>

    <div>
      <label for="srInput">Save/Reload Planet Name</label>
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
