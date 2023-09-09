<script setup lang="ts">
import GlyphInput from './components/GlyphInput.vue';
import NavBar from './components/NavBar.vue';
import ActionButtons from './components/ActionButtons.vue';
</script>

<template>
  <header>
    <NavBar />
    <h1 class="title">EisHub Catalogue Entry</h1>
  </header>

  <main>
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
    />

    <label for="image">Upload Image</label>
    <input
      type="file"
      id="image"
    />

    <GlyphInput />

    <ActionButtons />
  </main>
</template>

<style scoped lang="scss">
.title {
  margin-block-end: 2rem;
  text-align: center;
}
</style>
