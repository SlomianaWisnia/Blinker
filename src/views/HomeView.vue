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
import FetchedChatrooms from '../interfaces/FetchedChatrooms';
import Chats from '../interfaces/Chats'


export default {
  name: 'HomeView',
  components: {
    UsersComponent,
  },
  data() {
    return {
      chats: [] as Array<Chats>,
      hasFetchedChatrooms: false,
    }
  },
  methods: {
    getChatrooms() {
      axios.get('/get-last-messages').then((res) => {
        const loggedInUsername = store.state.user_info.user.username;
        const chats: Array<FetchedChatrooms> = res.data.chats;
        chats.forEach(({ _id, messages, members }) => {
          const last_message = messages[0];
          const friend = members.find(({ username }) => username !== loggedInUsername);
          if (friend) this.chats.push({ id: _id, friend, last_message, });
        });
      })
    }
  },
  mounted() {
    this.getChatrooms()
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
</style>../interfaces/FetchedChatrooms