<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { useCatalogueDataStore } from '../stores/catalogueData';
import { usePersistentDataStore } from '../stores/persistentData';
import { storeToRefs } from 'pinia';
import { compress, EImageType } from 'image-conversion';
import { useCurrentPage } from '../composables/useCurrentPage';
import { useRequiredFields } from '../composables/useRequiredFields';

const webhook = atob(import.meta.env.VITE_DISCORD_WEBHOOK);

const catalogueDataStore = useCatalogueDataStore();
const {
  name,
  file,
  notes,
  compressedFile,
  starship,
  freighter,
  frigate,
  multitool,
  creature,
  sandworm,
  flora,
  planet,
} = storeToRefs(catalogueDataStore);
const persistentDataStore = usePersistentDataStore();
const { contact, submittedEntries, catalogueUrl } = storeToRefs(persistentDataStore);

const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);

const isSending = ref(false);
const isSent = ref(false);
const sendFailed = ref(false);

const currentStage = ref('Submit');
const enableSubmissionSending = ref(false);

const isDev = import.meta.env.DEV;

const { currentPage } = useCurrentPage();

const emit = defineEmits(['reset']);

const albumStrings: { [key: string]: string } = reactive({
  starship,
  freighter,
  frigate,
  multitool,
  creature,
  sandworm,
  flora,
  planet,
});

const isValidData = computed(() => useRequiredFields().isValidData);

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
  quality -= 0.01; // NoSonar reduce quality by 1%;
  if (compressedFile.size > maxSize) return await compressFile(file); // compress original file with lower quality setting to avoid double compression

  const fileName = file.name.split('.').slice(0, -1).join('.');
  const newFileName = fileName + '-min.jpg';

  const newFile = new File([compressedFile], newFileName, { type: 'image/jpeg' });
  quality = 1; // reset quality
  return newFile;
}

const generateAlbumEntry = (page: string): string => albumStrings[page];

async function submitCatalogueEntry() {
  if (submittedEntries.value.has(name.value.value) || !file.value.value) return;
  isSending.value = true;

  const formData = new FormData();

  currentStage.value = 'Compressing Image...';
  compressedFile.value = await compressFile(file.value.value);
  if (!compressedFile.value?.name) return;

  const fileName = compressedFile.value.name;

  formData.append('file', compressedFile.value);
  formData.append(
    'payload_json',
    JSON.stringify({
      embeds: [
        {
          title: name.value,
          image: {
            url: 'attachment://' + fileName,
          },
          fields: [
            {
              name: 'Wiki Code',
              value: '```' + generateAlbumEntry(currentPage).trim() + '```',
            },
            {
              name: 'Wiki Link',
              value: `[${catalogueUrl.value.split('/').at(-1)?.replaceAll('_', ' ')}](${catalogueUrl.value})`,
            },
            {
              name: 'Notes',
              value: notes.value || '-',
            },
            {
              name: 'Author',
              value: contact.value,
            },
          ],
        },
      ],
    })
  );

  try {
    if (!import.meta.env.DEV || enableSubmissionSending.value) {
      currentStage.value = 'Sending...';
      const response = await fetch(webhook, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        isSent.value = true;
        currentStage.value = 'Submission Sent!';
        submittedEntries.value.add(name.value.value);
        console.log('Upload successful.');
      } else {
        console.log('Upload failed.');
        throw new Error();
      }
    } else {
      console.log(formData);
    }
  } catch (error) {
    currentStage.value = 'Submit failed!';
    sendFailed.value = true;
    console.warn(error);
  } finally {
    isSending.value = false;
    setTimeout(() => {
      isSent.value = false;
      sendFailed.value = false;
      currentStage.value = 'Submit';
    }, 3000); // NoSonar wait 3 seconds
  }
}

const openConfirmationDialog = () => confirmDialog.value?.toggleModal();
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
      {{ currentStage }}
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
  <div
    v-if="isDev"
    class="submission-toggle-wrapper"
  >
    <input
      role="switch"
      type="checkbox"
      id="sendSubmissionToggle"
      v-model="enableSubmissionSending"
    />
    <label for="sendSubmissionToggle">Enable Submission Sending</label>
  </div>
</template>

<style scoped lang="scss">
.buttons {
  display: flex;
  gap: 1rem;
  margin-block-start: 1.25rem;
}

.submission-toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
