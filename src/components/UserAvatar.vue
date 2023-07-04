<template>
  <p v-if="!avatarExists || !imgIsValid" :class="$style.avatar">
    {{ usernameLetter }}
  </p>
  <img @error="imgErrorHandler" v-if="avatarExists && imgIsValid" :src="avatarSrc" alt="" />
</template>

<script lang="ts">
export default {
  name: 'UserAvatar',
  data() {
    return {
      imgIsValid: true,
    };
  },
  props: {
    avatarExists: {
      type: String,
      required: true,
    },
    usernameLetter: {
      type: String,
      required: true,
    },
    avatarSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    imgErrorHandler() {
      this.imgIsValid = false;
    },
  },
};
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