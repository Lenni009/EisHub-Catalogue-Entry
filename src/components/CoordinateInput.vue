<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const catalogueDataStore = useCatalogueDataStore();
const { coordinates, isValidCoords } = storeToRefs(catalogueDataStore);

const isValidCoordsOnChange = ref(true);

const checkCoordValidity = () => (isValidCoordsOnChange.value = isValidCoords.value);
</script>

<template>
  <label for="coordInput">Planetary Coordinates</label>
  <input
    :aria-invalid="!isValidCoordsOnChange || undefined"
    id="coordInput"
    placeholder="+0.00, -0.00"
    type="text"
    v-model="coordinates.value"
    @change="checkCoordValidity"
  />
</template>
