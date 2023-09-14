<script setup lang="ts">
import { ref } from 'vue';

const dialogElement = ref<HTMLDialogElement | null>(null);
const toggleModal = () => {
  dialogElement.value?.showModal();
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
};

defineExpose({
  toggleModal,
});
</script>

<template>
  <dialog ref="dialogElement">
    <article>
      <header>
        <form
          method="dialog"
          class="close-button-wrapper"
        >
          <button
            aria-label="Close"
            class="close"
          ></button>
        </form>
        Confirm Catalogue Entry Submission?
      </header>
      <form
        method="dialog"
        class="confirm-options"
      >
        <button @click="$emit('confirm')">Yes</button>
        <button class="secondary">No</button>
      </form>
    </article>
  </dialog>
</template>

<style lang="scss">
.confirm-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 0;

  & button {
    margin-bottom: 0;
  }
}

.close-button-wrapper {
  display: inline;
  margin-bottom: 0;

  .close {
    background-color: transparent;
    border: none;

    &:active {
      box-shadow: none;
    }
  }
}
</style>
