<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const { features } = storeToRefs(catalogueDataStore);
</script>

<template>
  <div class="input-group">
    <div>
      <label for="features">Special Features of the Planet</label>
      <input
        id="features"
        type="text"
        maxlength="30"
        v-model="features"
      />
    </div>
  </div>
</template>
