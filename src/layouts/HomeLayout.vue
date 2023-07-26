<template>
  <TopNavigation />
  <router-view />
  <BottomNavigation />
</template>
<script setup lang="ts">
import TopNavigation from '@/components/home/TopNavigation.vue';
import BottomNavigation from '@/components/home/BottomNavigation.vue';
</script>
<style module lang="scss"></style>