<script setup lang="ts">
import ClassSelect from '../components/ClassSelect.vue';
import { useCatalogueUrl } from '../composables/useCatalogueUrl';

useCatalogueUrl('https://nomanssky.fandom.com/wiki/EisHub_Organic_Frigate_Catalog');
</script>

<template>
  <div class="input-group">
    <div>
      <ClassSelect />
    </div>
  </div>
</template>
