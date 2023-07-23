<template>
  <ChatNavbar />
  <router-view />
  <ChatMessageInput />
</template>

<script setup lang="ts">
import ChatNavbar from '../components/Chat/ChatNavbar.vue';
import ChatMessageInput from '../components/Chat/ChatMessageInput.vue';
</script>

<style module lang="scss"></style>
