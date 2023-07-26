<template>
  <NoChats v-if="!chats" />
  <ul v-else :class="$style.chatsList">
    <UserComponent v-for="chat in chats" :key="chat.friend.username" :chat="chat" />
  </ul>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import UserComponent from '@/components/Home/UserComponent.vue'
import FetchedChats from '@/interfaces/FetchedChats'
import Chats from '@/interfaces/Chats'
import NoChats from './NoChats.vue'

const chats = ref([] as Array<Chats>)

const store = useStore()

const getChatrooms = () => {
  axios.get('/get-last-messages').then((res) => {
    const loggedInUserUsername = store.state.loggedInUserData.user.username
    const fetchedChats: Array<FetchedChats> = res.data.chats

    fetchedChats.forEach(({ _id, messages, members }) => {
      const last_message = messages[0]
      const friend = members.find(({ username }) => username !== loggedInUserUsername)

      if (friend) chats.value.push({ id: _id, friend, last_message, })
    });
  })
}

onMounted(() => getChatrooms())

</script>
<style module lang="scss">
.chatsList {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 2.5rem;
  margin-top: 1rem;
}

.noChats {
  color: $txt-color-primary;
  text-align: center;
  margin-top: 3rem;
}
</style>