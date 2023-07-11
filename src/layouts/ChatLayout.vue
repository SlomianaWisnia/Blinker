<template>
  <ChatNavbar />
  <router-view />
  <ChatMessageInput />
</template>

<script lang="ts">
import ChatNavbar from '../components/Chat/ChatNavbar.vue';
import ChatMessageInput from '../components/Chat/ChatMessageInput.vue';

export default {
  name: "ChatLayout",
  components: {
    ChatNavbar,
    ChatMessageInput
  }
};
</script>

<style module lang="scss"></style>
