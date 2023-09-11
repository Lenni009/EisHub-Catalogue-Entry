<script setup lang="ts">
defineProps<{
  href: string;
  src: string;
  alt: string;
}>();
</script>

<template>
  <a
    :href="href"
    class="logo"
    rel="noopener noreferrer"
    target="_blank"
  >
    <img
      :alt="alt"
      :src="src"
    />
  </a>
</template>

<style scoped lang="scss">
.logo:focus {
  background-color: unset;
}
</style>
