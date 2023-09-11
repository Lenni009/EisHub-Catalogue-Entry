<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const validGlyphsRegex = /[0-9A-F]/;

const catalogueDataStore = useCatalogueDataStore();
const { glyphs, isGlyphsValid } = storeToRefs(catalogueDataStore);

function addGlyph(e: Event) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  if (glyphs.value.length !== 12) glyphs.value += e.target.value; // NoSonar 12 is maximum glyph length
}

function deleteGlyph() {
  glyphs.value = glyphs.value.slice(0, -1);
}

function lintGlyphs() {
  glyphs.value = glyphs.value
    .toUpperCase()
    .split('')
    .filter((char) => validGlyphsRegex.test(char))
    .join('');
}
</script>

<template>
  <label
    class="label"
    for="portalglyphsInput"
    >Portalglyphs:</label
  >
  <input
    :aria-invalid="(glyphs.length === 12 && !isGlyphsValid) || undefined"
    class="glyphs-input"
    id="portalglyphsInput"
    type="text"
    maxlength="12"
    v-model="glyphs"
    @input="lintGlyphs"
  />
  <button
    class="delete-button is-error"
    id="delButton"
    role="button"
    type="button"
    @click="deleteGlyph"
  >
    &larr; Delete
  </button>
  <p v-if="glyphs.length === 12 && !isGlyphsValid">Glyphs are outside of EisHub space!</p>
  <div class="portal-buttons grid">
    <button
      v-for="n in 16"
      class="button glyphs"
      type="button"
      :id="'glyphButton' + n"
      :value="(n - 1).toString(16).toUpperCase()"
      @click="addGlyph"
    >
      {{ (n - 1).toString(16).toUpperCase() }}
    </button>
  </div>
  <p>
    <output
      class="glyphs"
      id="glyphDisplay"
      >{{ glyphs }}</output
    >
  </p>
</template>

<style scoped lang="scss">
.glyphs {
  font-family: NMS-Glyphs-Mono;
  font-size: 3rem;
  word-break: break-word;
}

.portal-buttons {
  display: grid;
  grid-template-columns: repeat(8, auto);
  max-width: 40rem;

  .button {
    line-height: 3rem;
    padding: 0;
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

.delete-button {
  margin-inline: 0.5em;
  width: auto;
}

.glyphs-input {
  width: min(max(30%, 10rem), 100%);
}
</style>
