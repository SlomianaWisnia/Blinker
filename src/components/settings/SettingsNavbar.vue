<template>
  <div>
    <nav :class="$style.settingsNavbar">
      <router-link to="/"><img src="@/assets/icons/navigation/arrow_back.svg" alt="" /></router-link>
      <h2>{{ currentRouteName }}</h2>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const currentRouteName = computed(() => {
  let routeName = route.name as string;
  return routeName ? routeName.charAt(0).toUpperCase() + routeName.slice(1) : '';
}); 
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