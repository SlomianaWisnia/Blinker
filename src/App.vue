<template>
  <Navigation />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import Navigation from './components/layouts/Navigation.vue';
import Footer from './components/layouts/Footer.vue';
import './main.scss';

export default {
  components: {
    Navigation,
    Footer
  }
}
</script>

<style module lang="scss"></style>
