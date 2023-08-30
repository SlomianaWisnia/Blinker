<template>
  <RouteDefaultNavbar />
  <router-view />
</template>

<script setup lang="ts">
import RouteDefaultNavbar from '@/components/reusable/RouteDefaultNavbar.vue';
</script>

<style module lang="scss"></style>
<!-- I changed that the SettingsLayout is now a DefaultLayout with DefaultRouteNavbar and added ProfileView to routing -->