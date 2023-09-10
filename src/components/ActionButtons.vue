<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';
import { compress, EImageType } from 'image-conversion';
import router from '../router';

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
  compressedFile,
} = storeToRefs(catalogueDataStore);
const persistentDataStore = usePersistentDataStore();
const { requiredFields, contact, submittedEntries } = storeToRefs(persistentDataStore);

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

function currentPage() {
  const path = router.currentRoute.value.path;
  const identifier = path.replace('/', '').toLowerCase();
  console.log(router.currentRoute.value.path, identifier);
  return identifier;
}

function generateAlbumEntry(): string {
  return '';
}

async function submitCatalogueEntry() {
  if (submittedEntries.value.has(name.value)) return;
  if (!file.value) return;
  isSending.value = true;

  const formData = new FormData();

  compressedFile.value = await compressFile(file.value);
  if (!compressedFile.value?.name) return;

  formData.append(compressedFile.value.name, compressedFile.value);
  formData.append('content', generateAlbumEntry().trim());

  console.log(formData);
  try {
    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_WEBHOOK === 'true') {
      const response = await fetch(webhook, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
      } else {
        console.log('Upload failed.');
        throw new Error();
      }
    }
    isSent.value = true;
    submittedEntries.value.add(name.value);
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
