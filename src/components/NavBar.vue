<script setup lang="ts">
import { computed } from 'vue';
import ThemeSwitch from './ThemeSwitch.vue';
import router from '../router';

const isRoot = computed(() => router.currentRoute.value.path === '/');
</script>

<template>
  <nav>
    <ul>
      <li>
        <a
          v-if="isRoot"
          href=".."
          >&larr; View other pages</a
        >
        <router-link
          v-else
          to="/"
          >&larr; Return to main page</router-link
        >
      </li>
    </ul>
    <ul>
      <li>
        <ThemeSwitch />
      </li>
    </ul>
  </nav>
</template>
