<template>
  <Navigation />
  <router-view />
  <Footer />
</template>
<script lang="ts">
import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
export default {
  name: 'HomeLayout',
  components: {
    Navigation,
    Footer
  }
}
</script>
<style module lang="scss"></style>