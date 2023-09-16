<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { useCurrentPage } from '../composables/useCurrentPage';

const catalogueDataStore = useCatalogueDataStore();
const { name, file } = storeToRefs(catalogueDataStore);

const { currentPage } = useCurrentPage();

function updateStoreFile(e: Event) {
  if (!(e.target instanceof HTMLInputElement) || !e.target.files?.length) return;
  file.value.value = e.target.files[0];
}
</script>

<template>
  <div class="input-group">
    <div v-if="currentPage === 'sandworm'">
      <label class="required">Class</label>
      <select v-model="name.value">
        <option value="Ceaseless Burrower">Ceaseless Burrower</option>
        <option value="Colossal Being">Colossal Being</option>
        <option value="Gargantuan">Gargantuan</option>
        <option value="Giant Parasite">Giant Parasite</option>
        <option value="Planetary Maggot">Planetary Maggot</option>
        <option value="The Consumer">The Consumer</option>
        <option value="Unstoppable Nematode">Unstoppable Nematode</option>
        <option value="Worm Lord">Worm Lord</option>
      </select>
    </div>

    <div v-else>
      <label
        class="required"
        for="name"
        >Name</label
      >
      <input
        id="name"
        type="text"
        v-model="name.value"
      />
    </div>

    <div>
      <label
        class="required"
        for="image"
        >Upload Image</label
      >
      <input
        accept="image/*"
        id="image"
        type="file"
        @change="updateStoreFile"
      />
    </div>
  </div>
</template>
