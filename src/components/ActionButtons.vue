<script setup lang="ts">
import { computed, ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { storeToRefs } from 'pinia';
import { requiredFields } from '../objects/shared';

const webhook = atob(import.meta.env.VITE_DISCORD_WEBHOOK);

const catalogueDataStore = useCatalogueDataStore();
const { file, isGlyphsValid } = storeToRefs(catalogueDataStore);

const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);
const isSending = ref(false);
const isSent = ref(false);
const sendFailed = ref(false);

const emit = defineEmits(['reset']);

const isValidData = computed(
  () => requiredFields.every((field) => catalogueDataStore.$state[field]) && isGlyphsValid.value
);

function reset() {
  catalogueDataStore.$reset();
  emit('reset');
}

async function submitCatalogueEntry() {
  const formData = new FormData();

  formData.append(file.value!.name, file.value!);
  formData.append('content', 'Hello World');

  try {
    isSending.value = true;
    // const response = await fetch(webhook, {
    //   method: 'POST',
    //   body: formData,
    // });

    console.log(formData);
    // if (response.ok) {
    //   const data = await response.text();
    //   console.log(data);
    // } else {
    //   console.log('Upload failed.');
    //   throw new Error();
    // }
    isSent.value = true;
  } catch (error) {
    sendFailed.value = true;
    setTimeout(() => {
      sendFailed.value = false;
    }, 3000); // NoSonar wait 3 seconds
  } finally {
    isSending.value = false;
    setTimeout(() => {
      isSent.value = false;
    }, 3000); // NoSonar wait 3 seconds
  }
}

const openConfirmationDialog = () => confirmDialog.value?.toggleModal();

const buttonTextContent = computed(() => {
  if (isSending.value) {
    return '';
  } else if (isSent.value) {
    return 'Submission Sent!';
  } else if (sendFailed.value) {
    return 'Submit failed!';
  } else {
    return 'Submit';
  }
});
</script>

<template>
  <ConfirmDialog
    ref="confirmDialog"
    @confirm="submitCatalogueEntry"
  />
  <div class="buttons">
    <button
      :aria-busy="isSending"
      :class="{ 'is-error': sendFailed, 'is-success': isSent }"
      :disabled="!isValidData"
      role="button"
      type="button"
      @click="openConfirmationDialog"
    >
      {{ buttonTextContent }}
    </button>
    <button
      class="secondary"
      role="button"
      type="button"
      @click="reset"
    >
      Reset Inputs
    </button>
  </div>
</template>

<style scoped lang="scss">
.buttons {
  display: flex;
  gap: 1rem;
  margin-block: 1.25rem;
}
</style>
