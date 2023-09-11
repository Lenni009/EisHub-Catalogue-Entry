<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const { name, file } = storeToRefs(catalogueDataStore);

function updateStoreFile(e: Event) {
  if (!(e.target instanceof HTMLInputElement) || !e.target.files?.length) return;
  file.value = e.target.files[0];
}
</script>

<template>
  <div class="input-group">
    <div>
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        v-model="name"
      />
    </div>

    <div>
      <label for="image">Upload Image</label>
      <input
        accept="image/*"
        id="image"
        type="file"
        @change="updateStoreFile"
      />
    </div>
  </div>
</template>
