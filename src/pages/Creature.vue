<script setup lang="ts">
import { ref } from 'vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const catalogueDataStore = useCatalogueDataStore();
const { size } = storeToRefs(catalogueDataStore);

const isFaulty = ref(false);

function updateSize(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return;
  const inputValue = e.target.value;
  const num = parseFloat(inputValue);
  const isNegative = inputValue.startsWith('-');
  size.value.value = (isNegative ? '-' : '') + Math.abs(num).toFixed(1);
  isFaulty.value = isNaN(num) && inputValue !== '-' && Boolean(inputValue);
}
</script>

<template>
  <div class="input-group">
    <div>
      <label for="height">Creature Height</label>
      <input
        id="height"
        type="text"
        :aria-invalid="isFaulty || undefined"
        :maxlength="size.value.startsWith('-') ? 4 : 3"
        @input="updateSize"
      />
    </div>
  </div>
</template>
