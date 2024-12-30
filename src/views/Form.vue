<script setup lang="ts">
import GlyphInput from '../components/GlyphInput.vue';
import ActionButtons from '../components/ActionButtons.vue';
import DefaultInputs from '../components/DefaultInputs.vue';
import DiscovererInputs from '../components/DiscovererInputs.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCatalogueDataStore } from '@/stores/catalogueData';
import { useIsArtifact } from '@/composables/useIsArtifact';

const form = ref<HTMLFormElement | null>(null);

const { isArtifact } = useIsArtifact();

const catalogueDataStore = useCatalogueDataStore();
const { glyphs } = storeToRefs(catalogueDataStore);

watchEffect(() => (glyphs.value.isActive = !isArtifact.value));
</script>

<template>
  <div class="subheading">{{ useRoute().name }}</div>
  <form
    class="form-wrapper"
    ref="form"
    @submit.prevent
  >
    <DefaultInputs />
    <GlyphInput v-if="!isArtifact" />

    <router-view />

    <DiscovererInputs />

    <ActionButtons @reset="form?.reset()" />
  </form>
</template>

<style scoped>
.subheading {
  font-size: 1.5rem;
  text-align: center;
  margin-block-start: -1rem;
  margin-block-end: 1rem;
  font-weight: bold;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
