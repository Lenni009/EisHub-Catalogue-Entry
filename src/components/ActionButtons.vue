<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';
import { compress, EImageType } from 'image-conversion';

const webhook = atob(import.meta.env.VITE_DISCORD_WEBHOOK);

const catalogueDataStore = useCatalogueDataStore();
const {
  name,
  discoverer,
  discovererReddit,
  file,
  economy,
  coordinates,
  size,
  tier,
  systemFaction,
  saveReloadLocationName,
  locationName,
  notes,
  glyphs,
  isGlyphsValid,
} = storeToRefs(catalogueDataStore);
const persistentDataStore = usePersistentDataStore();
const { requiredFields, contact } = storeToRefs(persistentDataStore);

const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);
const isSending = ref(false);
const isSent = ref(false);
const sendFailed = ref(false);

const emit = defineEmits(['reset']);

const fields: { [key: string]: string | File | null } = reactive({
  name,
  discoverer,
  discovererReddit,
  file,
  economy,
  coordinates,
  size,
  tier,
  systemFaction,
  saveReloadLocationName,
  locationName,
  notes,
  contact,
  glyphs,
});

const isValidData = computed(() => requiredFields.value.every((field) => fields[field]) && isGlyphsValid.value);

function reset() {
  catalogueDataStore.$reset();
  emit('reset');
}

let quality = 1;

async function compressFile(file: File): Promise<File> {
  const maxSize = 10000000;
  if (file.size < maxSize) return file; // if below 10 MB, don't do anything
  const compressedFile = await compress(file, {
    quality,
    type: EImageType.JPEG,
    scale: 1,
  });
  const fileName = file.name.split('.').slice(0, -1).join('.');
  const isCompressed = compressedFile.size !== file.size;
  const newFileName = isCompressed ? fileName + '-min' : fileName;
  const fileExtension = isCompressed ? 'jpg' : file.name.split('.').pop();

  const newFullFileName = newFileName + '.' + fileExtension;

  const newFile = new File([compressedFile], newFullFileName, { type: 'image/jpeg' });
  quality -= 0.01; // NoSonar reduce quality by 1%;
  if (newFile.size > maxSize) return await compressFile(newFile);
  quality = 1; // reset quality
  return newFile;
}

async function submitCatalogueEntry() {
  if (!file.value) return;
  isSending.value = true;

  const formData = new FormData();

  const compressedFile = await compressFile(file.value);

  formData.append(compressedFile.name, compressedFile);
  formData.append('content', 'Hello World');

  try {
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
