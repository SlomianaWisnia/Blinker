<template>
  <main :class="$style.chatPage">
    <div :class="$style.friendInfo">
      <UserAvatar :avatar="'avatar'" :usernameLetter="'T'" />
      <h2>Test</h2>
      <p>email@gmail.com</p>
    </div>
    <div :class="$style.chatMessages">
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
      <ChatMessage message="Testowa" />
    </div>
  </main>
</template>
<script lang="ts">
import UserAvatar from '../components/UserAvatar.vue';
import ChatMessage from '../components/Chat/ChatMessage.vue'
import axios from 'axios';

export default {
  name: "ChatView",
  components: {
    UserAvatar,
    ChatMessage
  },
  computed: {
    chatId() {
      return this.$route.params.chatId
    }
  },
  methods: {
    fetchLastMessages() {
      axios.get(`/messages/${this.chatId}/1/15)`).then(res => console.log(res)).catch(err => console.log(err))
    }
  }
}
</script>
<style module lang="scss">
.chatPage {
  background-color: $bg-color-primary;
  min-height: 100vh;
  padding: 0.8rem;
  color: $txt-color-primary;

  .friendInfo {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 0.6rem;
    margin: 8rem 0 4rem 0;
    text-align: center;

    h2 {
      font-weight: normal;
    }

    p:nth-of-type(1) {
      width: 5rem;
      height: 5rem;
      font-size: 2.5rem;
      margin: 0 auto;
    }

    p:nth-of-type(2) {
      color: #dfeed8a8;
    }

  }

  .chatMessages {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;

    p:last-of-type {
      margin-bottom: 90px
    }
  }


}
</style>