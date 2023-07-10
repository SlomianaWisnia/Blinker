<template>
  <ChatNavbar />
  <router-view />
</template>

<script lang="ts">
import ChatNavbar from '../components/Chat/ChatNavbar.vue';

export default {
  name: "ChatLayout",
  components: {
    ChatNavbar,
  }
};
</script>

<style module lang="scss"></style>
