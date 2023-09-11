<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const { discoverer, discovererReddit, notes } = storeToRefs(catalogueDataStore);
const persistentDataStore = usePersistentDataStore();
const { contact } = storeToRefs(persistentDataStore);
</script>

<template>
  <div class="input-group">
    <div>
      <label for="username">Discoverer</label>
      <input
        type="text"
        id="username"
        v-model="discoverer"
      />
    </div>

    <div>
      <label for="redditUsername">Discoverer Reddit Name (if available)</label>
      <input
        type="text"
        id="redditUsername"
        v-model="discovererReddit"
      />
    </div>

    <div>
      <label for="docUsername">Your Username (Discord, Reddit, etc.) for Contact</label>
      <input
        type="text"
        id="docUsername"
        v-model="contact"
      />
    </div>

    <div>
      <label for="notes">Additional Notes for the Scribe Team</label>
      <textarea
        class="textarea"
        id="notes"
        type="text"
        v-model="notes"
      ></textarea>
    </div>
  </div>
</template>

<style scoped lang="scss">
.textarea {
  resize: vertical;
}
</style>
