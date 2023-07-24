<template>
  <main :class="$style.homePage">
    <section v-if="!chats" :class="$style.empty">
      <p>No chats yet.</p>
      <p>Get started by messaging a friend.</p>
    </section>
    <ul v-if="chats" :class="$style.users">
      <UserComponent v-for="chat in chats" :key="chat.friend.username" :chat="chat" />
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import UserComponent from '@/components/Home/UserComponent.vue';
import FetchedChats from '@/interfaces/FetchedChats';
import Chats from '@/interfaces/Chats'

const chats = ref([] as Array<Chats>)

const store = useStore()

const getChatrooms = () => {
  axios.get('/get-last-messages').then((res) => {
    const loggedInUserUsername = store.state.loggedInUserData.user.username;
    const fetchedChats: Array<FetchedChats> = res.data.chats;

    fetchedChats.forEach(({ _id, messages, members }) => {
      const last_message = messages[0];
      const friend = members.find(({ username }) => username !== loggedInUserUsername);

      if (friend) chats.value.push({ id: _id, friend, last_message, });
    });
  })
}

onMounted(() => getChatrooms())
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
</style>@interfaces/FetchedChats