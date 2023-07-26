<template>
  <p v-if="!props.avatar || !isImgValid" :class="$style.avatar">
    {{ usernameFirstLetter }}
  </p>
  <img @error="imgErrorHandler" v-if="props.avatar && isImgValid" :src="props.avatar" alt="" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isImgValid = ref(true)
const props = defineProps({
  avatar: {
    type: String,
    default: undefined,
  },
  usernameFirstLetter: {
    type: String,
    required: true,
  },
})

const imgErrorHandler = () => {
  isImgValid.value = false
}
</script>

<style module lang="scss">
.avatar {
  @include flex-center;
  font-size: 1.2rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: grey;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  margin-right: 0.2rem;
}
</style>