<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { useCatalogueDataStore } from './stores/catalogueData';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const catalogueDataStore = useCatalogueDataStore();
const { file, name } = storeToRefs(catalogueDataStore);

watch(useRoute(), () => {
  name.value = '';
  file.value = null;
});
</script>

<template>
  <header>
    <NavBar />
    <h1 class="title">EisHub Catalogue Entry</h1>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped lang="scss">
.title {
  margin-block-end: 2rem;
  text-align: center;
}
</style>
