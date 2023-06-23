<template>
  <nav :class="$style.settingsNavbar">
    <img src="../assets/icons/navigation/arrow_back.svg" alt="">
    <h2>{{ currentRouteName }}</h2>
  </nav>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'SettingsLayout',
  computed: {
    currentRouteName() {
      let routeName = this.$route.name;
      return routeName ? routeName.charAt(0).toUpperCase() + routeName.slice(1) : '';
    }
  },
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
