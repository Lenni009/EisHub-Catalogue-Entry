<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const catalogueDataStore = useCatalogueDataStore();
const { coordinates } = storeToRefs(catalogueDataStore);

const isValidCoords = ref(true);

const coordinatesValidationRegex = /^[+-](?:[0-9]{1,3})\.(?:[0-9]{2}), [+-](?:[0-9]{1,3})\.(?:[0-9]{2})$/;

const checkCoordValidity = () =>
  (isValidCoords.value = coordinatesValidationRegex.test(coordinates.value.value) || !coordinates.value.value);
</script>

<template>
  <label for="coordInput">Planetary Coordinates</label>
  <input
    :aria-invalid="!isValidCoords || undefined"
    id="coordInput"
    placeholder="+0.00, -0.00"
    type="text"
    v-model="coordinates.value"
    @change="checkCoordValidity"
  />
</template>
