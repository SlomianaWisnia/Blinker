<template>
  <div>
    <nav :class="$style.settingsNavbar">
      <img src="@/assets/icons/navigation/arrow_back.svg" alt="" @click="goBackOnePage" />
      <h2>{{ currentRouteName }}</h2>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const currentRouteName = computed(() => {
  let routeName = route.name as string;
  return routeName ? routeName.charAt(0).toUpperCase() + routeName.slice(1) : '';
});

const goBackOnePage = () => {
  router.go(-1)
}
</script>

<style module lang="scss">
.settingsNavbar {
  justify-content: flex-start;
  gap: 1rem;

  img {
    width: 35px;
  }
}
</style>