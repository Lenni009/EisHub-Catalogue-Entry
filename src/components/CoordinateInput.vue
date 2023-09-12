<script setup lang="ts">
import {useCatalogueDataStore} from '../stores/catalogueData';
import {storeToRefs} from 'pinia';
import {ref} from 'vue';

const catalogueDataStore = useCatalogueDataStore();
const {coordinates} = storeToRefs(catalogueDataStore);

const isValidCoords = ref(true);

const checkCoordValidity = () => isValidCoords.value = /[+-](?:[0-9]{1,3})\.(?:[0-9]{2}), [+-](?:[0-9]{1,3})\.(?:[0-9]{2})/.test(coordinates.value) || !coordinates.value;
</script>

<template>
    <label for="coordInput">Planetary Coordinates</label>
      <input
        :aria-invalid="!isValidCoords"
        id="coordInput"
        placeholder="+0.00, -0.00"
        type="text"
        v-model="coordinates"
        @change="checkCoordValidity"
      />
</template>