<script setup lang="ts">
import EconomySelect from '../components/EconomySelect.vue';
import CoordinateInput from '../components/CoordinateInput.vue';
import ClassSelect from '../components/ClassSelect.vue';
import PlanetInput from '../components/PlanetInput.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const catalogueDataStore = useCatalogueDataStore();
const { shipType } = storeToRefs(catalogueDataStore);

const isCrashedShip = computed(() => ['Interceptor', 'Living Ship'].includes(shipType.value));
</script>

<template>
  <div class="input-group">
    <div>
      <label>Ship Type</label>
      <select v-model="shipType">
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

    <div v-show="shipType !== 'Living Ship'">
      <EconomySelect />
    </div>

    <div v-show="isCrashedShip">
      <PlanetInput />
    </div>

    <div v-show="isCrashedShip">
      <CoordinateInput />
    </div>

    <div v-show="shipType === 'Interceptor'">
      <ClassSelect />
    </div>
  </div>
</template>
