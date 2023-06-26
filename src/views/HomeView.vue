<template>
  <main :class="$style.homePage">
    <section v-if="chats.length === 0" :class="$style.empty">
      <p>No chats yet.</p>
      <p>Get started by messaging a friend.</p>
    </section>
    <ul v-if="chats.length > 0" :class="$style.users">
      <UsersComponent v-for="chat in chats" :key="chat.friend.username" :chat="chat" />
    </ul>
  </main>
</template>

<script lang="ts">
import axios from 'axios';
import UsersComponent from '../components/Home/UsersComponent.vue';
import store from '../store';

export default {
  name: 'HomeView',
  components: {
    UsersComponent,
  },
  data() {
    return {
      chatrooms: [] as any,
      chats: [] as any,
      hasFetchedChatrooms: false,
    }
  },
  methods: {
    fetchChatrooms() {
      axios.get('/get-last-messages').then(res => {
        this.chatrooms = res.data.chats;
        this.getChats()
      });
    },
    getChats() {
      const username = store.state.user_info.user.username
      this.chatrooms.forEach(room => {
        const last_message = room.messages[0]
        const member = room.members.find(member => member.username !== username);
        this.chats.push({ friend: member, last_message })
      })
    }
  },
  mounted() {
    this.fetchChatrooms()
  }
}
</script>

<style module lang="scss">
.homePage {
  background-color: $bg-color-primary;
  min-height: 100vh;
  padding: 0.8rem;

  .empty {
    color: $txt-color-primary;
    text-align: center;
    margin-top: 2rem;

  }

  .users {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 1rem;
  }
}
</style>