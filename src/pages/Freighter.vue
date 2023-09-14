<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import EconomySelect from '../components/EconomySelect.vue';
import { useCatalogueUrl } from '../composables/useCatalogueUrl';
import { useRequiredFieldDefinition } from '../composables/useRequiredFieldDefinition';

const catalogueDataStore = useCatalogueDataStore();
const { systemFaction } = storeToRefs(catalogueDataStore);

useRequiredFieldDefinition(['economy', 'systemFaction']);
useCatalogueUrl('https://nomanssky.fandom.com/wiki/EisHub_Freighter_Catalog');
</script>

<template>
  <div class="input-group">
    <div>
      <label>Dominant Faction of the System</label>
      <select v-model="systemFaction.value">
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
