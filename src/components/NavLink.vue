<script setup lang="ts">
defineProps<{
  route: string;
  title: string;
}>();
</script>

<template>
  <router-link
    role="button"
    class="outline link"
    :to="route"
    >{{ title }}
  </router-link>
</template>

<style scoped lang="scss">
.link {
  font-size: inherit;
  padding: 0.75rem 1.25rem;
  width: 100%;

  &:hover {
    color: white;
    background-color: var(--primary);
  }
}
</style>
