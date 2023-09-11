<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const { tier } = storeToRefs(catalogueDataStore);
</script>

<template>
  <label>Class</label>
  <select v-model="tier">
    <option value="C">C</option>
    <option value="B">B</option>
    <option value="A">A</option>
    <option value="S">S</option>
  </select>
</template>
