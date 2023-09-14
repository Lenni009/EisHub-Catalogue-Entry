<script setup lang="ts">
import EconomySelect from '../components/EconomySelect.vue';
import CoordinateInput from '../components/CoordinateInput.vue';
import ClassSelect from '../components/ClassSelect.vue';
import LocationPlanetInput from '../components/LocationPlanetInput.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useCatalogueUrl } from '../composables/useCatalogueUrl';

const catalogueDataStore = useCatalogueDataStore();
const { shipType, isCrashed } = storeToRefs(catalogueDataStore);

const isAlwaysCrashed = computed(() => ['Interceptor', 'Living Ship'].includes(shipType.value.value));

const isCrashedShip = computed(() => isAlwaysCrashed.value || isCrashed.value.value);

useCatalogueUrl('https://nomanssky.fandom.com/wiki/EisHub_Starship_Catalogs');
</script>

<template>
  <div class="input-group">
    <div>
      <label>Ship Type</label>
      <select v-model="shipType.value">
        <option value="Fighter">Fighter</option>
        <option value="Explorer">Explorer</option>
        <option value="Hauler">Hauler</option>
        <option value="Shuttle">Shuttle</option>
        <option value="Exotic">Exotic</option>
        <option value="Solar">Solar</option>
        <option value="Living Ship">Living Ship</option>
        <option value="Interceptor">Interceptor</option>
      </select>
    </div>

    <div
      v-show="!isAlwaysCrashed"
      class="checkbox-wrapper"
    >
      <label for="crashed">Crashed</label>
      <input
        id="crashed"
        type="checkbox"
        v-model="isCrashed.value"
      />
    </div>

    <div v-show="shipType.value !== 'Living Ship'">
      <EconomySelect />
    </div>

    <div v-show="isCrashedShip">
      <LocationPlanetInput />
    </div>

    <div v-show="isCrashedShip">
      <CoordinateInput />
    </div>

    <div v-show="isCrashed.value && shipType.value !== 'Living Ship'">
      <ClassSelect />
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkbox-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 0;
}
</style>
