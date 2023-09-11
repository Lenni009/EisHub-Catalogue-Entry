<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import EconomySelect from '../components/EconomySelect.vue';

const catalogueDataStore = useCatalogueDataStore();
const { systemFaction } = storeToRefs(catalogueDataStore);
</script>

<template>
  <div class="input-group">
    <div>
      <label>Dominant Faction of the System</label>
      <select v-model="systemFaction">
        <option value="Korvax">Korvax</option>
        <option value="Gek">Gek</option>
        <option value="Vy'keen">Vy'keen</option>
      </select>
    </div>

    <div>
      <EconomySelect />
    </div>
  </div>
</template>
