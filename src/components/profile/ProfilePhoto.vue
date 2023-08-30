<template>
  <div :class="$style.profilePhoto">
    <UserAvatar :size="110" />
    <button>Edit photo</button>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from '@/components/reusable/UserAvatar.vue';
</script>

<style module lang="scss">
.profilePhoto {
  @include flex-center;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;

  button {
    padding: 0.65rem 1rem;
    border-radius: 1.25rem;
    border: none;
    background-color: lighten($bg-color-secondary, 1%);
    font-size: 1rem;
    color: $txt-color-primary;
    cursor: pointer;


  }

  button:hover {
    background-color: lighten($bg-color-secondary, 4%);
  }
}
</style>
