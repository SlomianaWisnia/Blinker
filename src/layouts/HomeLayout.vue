<template>
  <TopNavigation />
  <router-view />
  <BottomNavigation />
</template>
<script setup lang="ts">
import TopNavigation from '@/components/Home/TopNavigation.vue';
import BottomNavigation from '@/components/Home/BottomNavigation.vue';
</script>
<style module lang="scss"></style>