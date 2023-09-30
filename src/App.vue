<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { useCatalogueDataStore } from './stores/catalogueData';
import { usePersistentDataStore } from './stores/persistentData';
import { storeToRefs } from 'pinia';
import router from './router';

const catalogueDataStore = useCatalogueDataStore();
const { file, name } = storeToRefs(catalogueDataStore);

const persistentDataStore = usePersistentDataStore();
const { requiredFields, catalogueUrl } = storeToRefs(persistentDataStore);

router.afterEach((to) => {
  const newCatalogueUrl = to.meta.catalogueUrl;
  const newRequiredFields = to.meta.requiredFields;
  catalogueUrl.value = typeof newCatalogueUrl === 'string' ? newCatalogueUrl : '';
  requiredFields.value = Array.isArray(newRequiredFields) ? newRequiredFields : [];

  name.value.value = '';
  file.value.value = null;
});
</script>

<template>
  <header>
    <NavBar />
    <h1 class="title">Eisvana Catalogue Entry</h1>
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
