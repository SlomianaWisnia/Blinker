<template>
  <nav :class="$style.chatNavbar">
    <router-link to="/"><img src="../../assets/icons/navigation/arrow_back.svg" alt="" /></router-link>
    <div :class="$style.info">
      <UserAvatar :avatar="'avatar'" :usernameFirstLetter="'T'" />
      <h4>Test</h4>
    </div>
    <div :class="$style.controls">
      <img src="../../assets/icons/navigation/videocall.svg" alt="">
      <img src="../../assets/icons/footer/call.svg" alt="">
      <img src="../../assets/icons/navigation/more.svg" alt="">
    </div>
  </nav>
</template>

<script setup lang="ts">
import UserAvatar from '../UserAvatar.vue';
</script>

<style module lang="scss">
.chatNavbar {
  padding: 1.6rem 1.5rem;
  justify-content: flex-start;
  gap: 1rem;
  background-color: $bg-color-secondary;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  a {
    font-size: 0;

    img {
      width: 40px;
    }
  }

  .info {
    @include flex-center;
    gap: 0.5rem;

    h4 {
      font-size: 1.2rem
    }
  }

  .controls {
    @include flex-center;
    gap: 0.5rem;
    margin-left: auto;

    img {
      width: 36px;
    }
  }
}
</style>