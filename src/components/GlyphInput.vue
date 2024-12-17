<script setup lang="ts">
import { watchEffect } from 'vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import ErrorMessage from './ErrorMessage.vue';

const validGlyphsRegex = /[0-9A-F]/;

const catalogueDataStore = useCatalogueDataStore();
const { glyphs, isValidGlyphs } = storeToRefs(catalogueDataStore);

function addGlyph(e: Event) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  if (glyphs.value.value.length < 12) glyphs.value.value += e.target.value; // NoSonar 12 is maximum glyph length
}

function deleteGlyph() {
  glyphs.value.value = glyphs.value.value.slice(0, -1);
}

function lintGlyphs() {
  glyphs.value.value = glyphs.value.value
    .toUpperCase()
    .split('')
    .filter((char) => validGlyphsRegex.test(char))
    .join('');
}

const numberToGlyph = (n: number) => n.toString(16).toUpperCase(); // NoSonar this is dec to hex

watchEffect(() => (glyphs.value.isValid = isValidGlyphs.value));
</script>

<template>
  <div>
    <label
      class="required"
      for="portalglyphsInput"
      >Portalglyphs</label
    >
    <div class="glyph-input-wrapper">
      <input
        v-model="glyphs.value"
        :aria-invalid="(glyphs.value.length === 12 && !isValidGlyphs) || undefined"
        class="glyphs-input"
        id="portalglyphsInput"
        maxlength="12"
        type="text"
        @input="lintGlyphs"
      />
      <button
        class="delete-button is-error"
        id="delButton"
        type="button"
        @click="deleteGlyph"
      >
        &larr; Delete
      </button>
    </div>
    <ErrorMessage
      v-if="glyphs.value.length === 12 && !isValidGlyphs"
      class="error"
      >Glyphs are outside of Eisvana space!</ErrorMessage
    >
    <div class="portal-buttons grid">
      <button
        v-for="n in 16"
        :id="'glyphButton' + n"
        :value="numberToGlyph(n - 1)"
        class="button glyphs"
        type="button"
        @click="addGlyph"
      >
        {{ numberToGlyph(n - 1) }}
      </button>
    </div>
    <p
      v-show="glyphs.value"
      class="glyph-display-wrapper"
    >
      <output
        class="glyphs"
        id="glyphDisplay"
        >{{ glyphs.value }}</output
      >
    </p>
  </div>
</template>

<style scoped lang="scss">
.glyphs {
  font-family: NMS-Glyphs-Mono;
  font-size: 3rem;
  word-break: break-word;
}

.glyph-display-wrapper {
  margin-bottom: 0 !important;
}

.portal-buttons {
  display: grid;
  grid-template-columns: repeat(8, auto);
  max-width: 800px;

  .button {
    line-height: 3rem;
    padding: 0;
    margin: 0;
  }
}

@media only screen and (max-width: 767px) {
  .portal-buttons {
    display: flex;
    flex-wrap: wrap;

    .button {
      width: 4rem;
    }
  }
}

.glyph-input-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;

  .delete-button {
    margin-inline-start: 0.5rem;
    width: auto;
  }

  .glyphs-input {
    flex-grow: 1;
    width: auto;
  }
}

.error {
  margin-block-end: 0.5rem;
}
</style>
