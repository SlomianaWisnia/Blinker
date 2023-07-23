<template>
  <Navigation />
  <router-view />
  <Footer />
</template>
<script setup lang="ts">
import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
</script>
<style module lang="scss"></style>