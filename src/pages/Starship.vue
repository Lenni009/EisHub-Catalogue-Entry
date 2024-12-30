<script setup lang="ts">
import EconomySelect from '../components/EconomySelect.vue';
import CoordinateInput from '../components/CoordinateInput.vue';
import ClassSelect from '../components/ClassSelect.vue';
import LocationPlanetInput from '../components/LocationPlanetInput.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { computed, watchEffect } from 'vue';

const catalogueDataStore = useCatalogueDataStore();
const { shipType, isCrashed, economy, coordinates, locationName, tier } = storeToRefs(catalogueDataStore);

const isAlwaysCrashed = computed(() => ['Interceptor', 'Living Ship'].includes(shipType.value.value));
const isCrashedShip = computed(() => isAlwaysCrashed.value || isCrashed.value.value);
const isLivingShip = computed(() => shipType.value.value === 'Living Ship');

watchEffect(() => (economy.value.isActive = !isLivingShip.value));

watchEffect(() => {
  coordinates.value.isActive = isCrashedShip.value;
  locationName.value.isActive = isCrashedShip.value;
});

watchEffect(() => (tier.value.isActive = isCrashed.value.value && !isLivingShip.value));
</script>

<template>
  <div class="input-group">
    <div>
      <label class="required">Ship Type</label>
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

    <div v-show="economy.isActive">
      <EconomySelect />
    </div>

    <div v-show="locationName.isActive">
      <LocationPlanetInput />
    </div>

    <div v-show="coordinates.isActive">
      <CoordinateInput />
    </div>

    <div v-show="tier.isActive">
      <ClassSelect />
    </div>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 0;
}
</style>
