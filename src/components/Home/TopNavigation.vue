<template>
  <nav>
    <div :class="$style.info">
      <UserAvatar @click="goToSettings" />
      <h1>Blinker</h1>
    </div>
    <div :class="$style.controls">
      <img src="@/assets/icons/navigation/search.svg" alt="search icon">
      <img src="@/assets/icons/navigation/more.svg" alt="menu icon">
    </div>
    <img src="@/assets/icons/navigation/wave.svg" alt="animated wave background" :class="$style.wave">
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import UserAvatar from '@/components/reusable/UserAvatar.vue';

const router = useRouter()

const goToSettings = () => {
  router.push('/settings')
}
</script>

<style module lang="scss">
nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $bg-color-primary;
  color: $txt-color-primary;
  padding: 1.5rem 2rem;
  overflow: hidden;

  .info,
  .controls {
    @include flex-center;
    z-index: 10;
    gap: 1rem;
  }

  .info {
    h1 {
      text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
    }

    a {
      text-decoration: none;
      color: white;
    }
  }



  .controls {
    img {
      height: 40px;
      width: 40px;
      padding: 0.3rem;
      cursor: pointer;
      box-shadow: 4px 4px 15px 1px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
  }

  .wave {
    position: absolute;
    width: 100vh;
    top: -40px;
    left: 0;
    z-index: 1;
  }
}
</style>