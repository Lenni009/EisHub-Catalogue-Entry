<script setup lang="ts">
import { ref } from 'vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { useCatalogueUrl } from '../composables/useCatalogueUrl';

const catalogueDataStore = useCatalogueDataStore();
const { depth, stomach } = storeToRefs(catalogueDataStore);

const isFaulty = ref(false);

function updateDepth(e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return;
  const inputValue = e.target.value;
  const num = parseFloat(inputValue);
  depth.value = num.toFixed(1);
  isFaulty.value = isNaN(num) && Boolean(inputValue);
}

useCatalogueUrl('https://nomanssky.fandom.com/wiki/EisHub_Shaihuluda_Album');
</script>

<template>
  <div class="input-group">
    <div>
      <label for="depth">Max. Depth</label>
      <input
        id="depth"
        type="text"
        :aria-invalid="isFaulty || undefined"
        maxlength="5"
        @input="updateDepth"
      />
    </div>

    <div>
      <label>Stomach Contents</label>
      <select v-model="stomach">
        <option value="Consumed waypoints">Consumed waypoints</option>
        <option value="Entire trade outpost">Entire trade outpost</option>
        <option value="Freighter components">Freighter components</option>
        <option value="Horrific Eggs">Horrific Eggs</option>
        <option value="Layers of teeth">Layers of teeth</option>
        <option value="Lost starships">Lost starships</option>
        <option value="Magma">Magma</option>
        <option value="Many Sentinels">Many Sentinels</option>
        <option value="Minerals">Minerals</option>
        <option value="Mostly sand">Mostly sand</option>
        <option value="Other gargantuans">Other gargantuans</option>
        <option value="Planetary beacon">Planetary beacon</option>
        <option value="Rubble">Rubble</option>
        <option value="Sentinel Walkers">Sentinel Walkers</option>
        <option value="Several Gek">Several Gek</option>
        <option value="Unpleasant liquid">Unpleasant liquid</option>
      </select>
    </div>
  </div>
</template>
