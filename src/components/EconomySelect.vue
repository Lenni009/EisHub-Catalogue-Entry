<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const { economy } = storeToRefs(catalogueDataStore);
</script>

<template>
  <label class="required">Economy Tier</label>
  <select
    id="wealthInput"
    v-model="economy.value"
  >
    <optgroup label="T3">
      <option value="★★★ Economy">Advanced</option>
      <option value="★★★ Economy">Affluent</option>
      <option value="★★★ Economy">Booming</option>
      <option value="★★★ Economy">Flourishing</option>
      <option value="★★★ Economy">High Supply</option>
      <option value="★★★ Economy">Opulent</option>
      <option value="★★★ Economy">Prosperous</option>
      <option value="★★★ Economy">Wealthy</option>
    </optgroup>
    <optgroup label="T2">
      <option value="★★ Economy">Adequate</option>
      <option value="★★ Economy">Balanced</option>
      <option value="★★ Economy">Comfortable</option>
      <option value="★★ Economy">Developing</option>
      <option value="★★ Economy">Medium Supply</option>
      <option value="★★ Economy">Promising</option>
      <option value="★★ Economy">Satisfactory</option>
      <option value="★★ Economy">Sustainable</option>
    </optgroup>
    <optgroup label="T1">
      <option value="★ Economy">Declining</option>
      <option value="★ Economy">Destitute</option>
      <option value="★ Economy">Failing</option>
      <option value="★ Economy">Fledgling</option>
      <option value="★ Economy">Low Supply</option>
      <option value="★ Economy">Struggling</option>
      <option value="★ Economy">Unsuccessful</option>
      <option value="★ Economy">Unpromising</option>
    </optgroup>
    <optgroup label="Pirate">
      <option value="{{BlackMarket}}">Black Market</option>
    </optgroup>
    <optgroup label="Abandoned">
      <option value="★ Economy (Abandoned)">Abandoned</option>
    </optgroup>
  </select>
</template>
