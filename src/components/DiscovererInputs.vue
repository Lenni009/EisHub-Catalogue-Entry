<script setup lang="ts">
import { watchEffect } from 'vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';
import { useIsArtifact } from '@/composables/useIsArtifact';

const { isArtifact } = useIsArtifact();

const catalogueDataStore = useCatalogueDataStore();
const { discoverer, discovererReddit, notes } = storeToRefs(catalogueDataStore);
const persistentDataStore = usePersistentDataStore();
const { contact } = storeToRefs(persistentDataStore);

watchEffect(() => {
  discoverer.value.isActive = !isArtifact.value;
  discovererReddit.value.isActive = !isArtifact.value;
});
</script>

<template>
  <div class="input-group">
    <div
      v-if="!isArtifact"
      class="discoverer-group-wrapper"
    >
      <p class="required one-required-notice">Fill out at least one</p>
      <div class="discoverer-group">
        <div>
          <label for="username">Discoverer</label>
          <input
            class="required"
            type="text"
            id="username"
            v-model="discoverer.value"
          />
        </div>

        <div>
          <label for="redditUsername">Discoverer Reddit Name (if available)</label>
          <input
            type="text"
            id="redditUsername"
            v-model="discovererReddit.value"
          />
        </div>
      </div>
    </div>

    <div>
      <label
        class="required"
        for="docUsername"
        >Your Username (Discord, Reddit, etc.) for Contact</label
      >
      <input
        type="text"
        id="docUsername"
        v-model="contact.value"
      />
    </div>

    <div class="textarea-wrapper">
      <label for="notes">Additional Notes for the Wiki Scholar Team</label>
      <textarea
        class="textarea"
        id="notes"
        type="text"
        v-model="notes.value"
      ></textarea>
    </div>
  </div>
</template>

<style scoped lang="scss">
.textarea-wrapper {
  width: 100%;
  .textarea {
    resize: vertical;
  }
}

.discoverer-group-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid var(--form-element-border-color);
  border-radius: var(--border-radius);

  .one-required-notice {
    margin: 0;
    font-size: 0.75rem;
    text-align: center;
  }

  .discoverer-group {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 1rem;

    & > * {
      flex-grow: 1;
    }
  }
}
</style>
