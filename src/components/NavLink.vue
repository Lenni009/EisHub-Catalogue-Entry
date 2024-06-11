<script setup lang="ts">
defineProps<{
  route: string;
  title: string;
}>();
</script>

<template>
  <router-link
    :to="route"
    class="outline link"
    role="button"
    >{{ title }}
  </router-link>
</template>

<style scoped lang="scss">
.link {
  font-size: inherit;

  &:hover {
    color: white;
    background-color: var(--pico-primary);
  }
}
</style>
