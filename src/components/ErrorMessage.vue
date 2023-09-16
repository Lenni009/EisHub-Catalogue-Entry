<template>
  <p class="error">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">
.error {
  font-size: small;
  color: var(--form-element-invalid-border-color);
  margin: 0;
  margin-block-start: -1rem;
}
</style>
