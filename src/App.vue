<script lang="ts">
import Navigation from './components/layouts/Navigation.vue';
import './main.scss'

export default {
  components: {
    Navigation
  }
}
</script>

<template>
  <Navigation />
  <router-view />
</template>

<style lang="scss"></style>
