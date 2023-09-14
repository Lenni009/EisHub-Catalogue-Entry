<script setup lang="ts">
import { ucFirst } from '../functions/functions';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import type { StellarLocation } from '../types/catalogue';

const catalogueDataStore = useCatalogueDataStore();
const { locationName } = storeToRefs(catalogueDataStore);

interface Props {
  locationType?: StellarLocation;
}

withDefaults(defineProps<Props>(), {
  locationType: 'planet',
});
</script>

<template>
  <label for="locInput">{{ ucFirst(locationType) }} Name</label>
  <input
    type="text"
    id="locInput"
    v-model="locationName.value"
  />
</template>
