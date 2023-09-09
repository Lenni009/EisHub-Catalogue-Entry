<script setup lang="ts">
import { computed, ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';

const webhook = atob(import.meta.env.VITE_DISCORD_WEBHOOK);

const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);
const isSending = ref(false);
const isSent = ref(false);
const sendFailed = ref(false);

async function submitCatalogueEntry() {
  const formData = new FormData();

  formData.append(file.value.name, file.value);
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
  } catch (error) {
    sendFailed.value = true;
    setTimeout(() => {
      sendFailed.value = false;
    }, 3000); // NoSonar wait 3 seconds
  } finally {
    isSending.value = false;
    isSent.value = true;
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
  <button
    :aria-busy="isSending"
    :class="{ 'is-error': sendFailed }"
    @click="openConfirmationDialog"
  >
    {{ buttonTextContent }}
  </button>
</template>