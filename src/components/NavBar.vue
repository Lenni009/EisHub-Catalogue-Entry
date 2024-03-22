<script setup lang="ts">
import { computed } from 'vue';
import ThemeSwitch from './ThemeSwitch.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isRoot = computed(() => route?.path === '/');

const isEisvanaHost = window.location.host === 'album.eisvana.com';
</script>

<template>
  <nav>
    <ul>
      <li>
        <a
          v-if="isRoot"
          :href="isEisvanaHost ? 'https://eisvana.com' : '..'"
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
