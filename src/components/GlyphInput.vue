<template>
  <label
    class="label"
    for="portalglyphsInput"
    >Portalglyphs:</label
  >
  <input
    class="glyphs-input"
    id="portalglyphsInput"
    type="text"
  />
  <button
    class="delete-button is-error"
    id="delButton"
    role="button"
    type="button"
  >
    &larr; Delete
  </button>
  <div class="portal-buttons grid">
    <button
      v-for="n in 16"
      class="button glyphs"
      type="button"
      :id="'glyphButton' + n"
      :value="(n - 1).toString(16).toUpperCase()"
    >
      {{ (n - 1).toString(16).toUpperCase() }}
    </button>
  </div>
  <p>
    <output
      class="glyphs"
      id="glyphDisplay"
    ></output>
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
