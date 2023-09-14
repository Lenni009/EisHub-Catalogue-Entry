<script setup lang="ts">
import { useCatalogueUrl } from '../composables/useCatalogueUrl';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const { features } = storeToRefs(catalogueDataStore);

useCatalogueUrl('https://nomanssky.fandom.com/wiki/EisHub_Planet_Albums');
</script>

<template>
  <div class="input-group">
    <div>
      <label for="features">Special Features of the Planet</label>
      <input
        id="features"
        type="text"
        maxlength="30"
        v-model="features.value"
      />
    </div>
  </div>
</template>
