<script setup lang="ts">
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';

const validGlyphsRegex = /[0-9A-F]/;

const catalogueDataStore = useCatalogueDataStore();
const { glyphs, isValidGlyphs } = storeToRefs(catalogueDataStore);

function addGlyph(e: Event) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  if (glyphs.value.value.length !== 12) glyphs.value.value += e.target.value; // NoSonar 12 is maximum glyph length
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
</script>

<template>
  <div>
    <label
      class="label"
      for="portalglyphsInput"
      >Portalglyphs:</label
    >
    <div class="glyph-input-wrapper">
      <input
        :aria-invalid="(glyphs.value.length === 12 && !isValidGlyphs) || undefined"
        class="glyphs-input"
        id="portalglyphsInput"
        type="text"
        maxlength="12"
        v-model="glyphs.value"
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
    </div>
    <p v-if="glyphs.value.length === 12 && !isValidGlyphs">Glyphs are outside of EisHub space!</p>
    <div class="portal-buttons grid">
      <button
        v-for="n in 16"
        class="button glyphs"
        type="button"
        :id="'glyphButton' + n"
        :value="numberToGlyph(n - 1)"
        @click="addGlyph"
      >
        {{ numberToGlyph(n - 1) }}
      </button>
    </div>
    <p v-show="glyphs.value">
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

.portal-buttons {
  display: grid;
  grid-template-columns: repeat(8, auto);
  max-width: 800px;

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
</style>
