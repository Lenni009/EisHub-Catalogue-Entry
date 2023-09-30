<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import ErrorMessage from '../components/ErrorMessage.vue';
import { watchEffect } from 'vue';

const catalogueDataStore = useCatalogueDataStore();
const { artifactType, artifactRarity, modifier, value, id, isValidValue, isValidModifier, isValidId } =
  storeToRefs(catalogueDataStore);

watchEffect(() => {
  modifier.value.isValid = isValidModifier.value;
  value.value.isValid = isValidValue.value;
  id.value.isValid = isValidId.value;
});
</script>

<template>
  <div class="input-group">
    <div>
      <label class="required">Type</label>
      <select v-model="artifactType.value">
        <option value="Ancient Skeleton">Ancient Skeleton</option>
        <option value="Aquatic Treasure">Aquatic Treasure</option>
        <option value="Biological Sample">Biological Sample</option>
        <option value="Delicate Flora (FARM)">Delicate Flora (mutated genes)</option>
        <option value="Delicate Flora (PLNT)">Delicate Flora (years)</option>
        <option value="Excavated Bones">Excavated Bones</option>
        <option value="Fossil Sample">Fossil Sample</option>
        <option value="Historical Document">Historical Document</option>
        <option value="Lost Artifact">Lost Artifact</option>
        <option value="Salvaged Scrap">Salvaged Scrap</option>
        <option value="Terrifying Sample">Terrifying Sample</option>
        <option value="Unearthed Treasure">Unearthed Treasure</option>
      </select>
    </div>
    <div>
      <label class="required">Rarity</label>
      <select v-model="artifactRarity.value">
        <option value="Common">Common (Blue)</option>
        <option value="Uncommon">Uncommon (Purple) Treasure</option>
        <option value="Rare">Rare (Yellow)</option>
      </select>
    </div>
    <div>
      <label
        class="required"
        for="modifier"
        >Modifier</label
      >
      <input
        v-model="modifier.value"
        id="modifier"
        type="text"
      />
      <ErrorMessage v-if="!isValidModifier">Must only contain numbers</ErrorMessage>
    </div>
    <div>
      <label
        class="required"
        for="value"
        >Value</label
      >
      <input
        v-model="value.value"
        id="value"
        type="text"
      />
      <ErrorMessage v-if="!isValidValue">Must only contain numbers</ErrorMessage>
    </div>
    <div>
      <label for="id">ID (from save editor)</label>
      <input
        v-model="id.value"
        id="id"
        type="text"
      />
      <ErrorMessage v-if="!isValidId">Must only contain numbers</ErrorMessage>
    </div>
  </div>
</template>
