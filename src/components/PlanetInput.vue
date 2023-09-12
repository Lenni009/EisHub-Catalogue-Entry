<script setup lang="ts">
import {ucFirst} from '../functions/functions';
import {useCatalogueDataStore} from '../stores/catalogueData';
import {storeToRefs} from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const {locationName, locationType} = storeToRefs(catalogueDataStore);
</script>

<template>
      <label for="locInput">{{ ucFirst(locationType || 'planet') }} Name</label>
      <input
        type="text"
        id="locInput"
        v-model="locationName"
      />
</template>