<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import ErrorMessage from '../components/ErrorMessage.vue';

const catalogueDataStore = useCatalogueDataStore();
const { size, isValidSize } = storeToRefs(catalogueDataStore);

function updateSize(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return;
  const inputValue = e.target.value;
  const num = parseFloat(inputValue);
  const isNegative = inputValue.startsWith('-');
  size.value.value = (isNegative ? '-' : '') + Math.abs(num).toFixed(1);
  size.value.isValid = isValidSize.value;
}
</script>

<template>
  <div class="input-group">
    <div>
      <label
        class="required"
        for="height"
        >Creature Height</label
      >
      <input
        id="height"
        type="text"
        placeholder="0.0"
        :aria-invalid="!isValidSize || undefined"
        :maxlength="size.value.startsWith('-') ? 4 : 3"
        @input="updateSize"
      />
      <ErrorMessage v-if="!isValidSize">Must only contain numbers</ErrorMessage>
    </div>
  </div>
</template>
