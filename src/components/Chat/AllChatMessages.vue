<template>
  <div :class="$style.chatMessages">
    <p :class="$style.noMessages" v-if="!messages">No messages yet!</p>
    <ChatMessage v-else v-for="message in messages" :key="message.createdAt" :message="message.message"
      :date="message.createdAt" :class="$style[checkMessageSender(message)]" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ChatMessage from '@/components/Chat/ChatMessage.vue'
import Message from '@/interfaces/Message';
import axios from 'axios'

const AMOUNT_TO_FETCH = 10
const store = useStore()

const route = useRoute()
const chatId = route.params.chatId

const messages = reactive([] as Array<Message>)
const messagesAmount = ref(AMOUNT_TO_FETCH)
const reachedMax = ref(false)


const fetchLastMessages = () => {
  axios.get(`/messages/${chatId}/${messagesAmount.value - AMOUNT_TO_FETCH}/${messagesAmount.value}`).then(res => {
    const newMessages = res.data.messages.reverse();

    messages.unshift(...newMessages);
    reachedMax.value = res.data.reachedMax;
  }).catch(err => console.log(err))
}

const handleInfiniteScroll = () => {
  const isAtTopOfPage = window.scrollY <= 20;
  if (isAtTopOfPage && !reachedMax.value) {
    messagesAmount.value += AMOUNT_TO_FETCH;
  }
};

watchEffect(() => {
  fetchLastMessages();
});

const checkMessageSender = (message: Message) => {
  return message.from.username === store.state.loggedInUserData.user.username ? 'userMessage' : 'friendMessage'
}

window.addEventListener("scroll", handleInfiniteScroll);
</script>

<style module lang="scss">
.chatMessages {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  gap: 2rem;
  min-height: 100vh;
  margin: 6rem 0 4rem 0;
  padding: 1rem;

  .userMessage {
    align-self: flex-end;
  }

  .friendMessage {
    align-self: flex-start;
  }

  .noMessages {
    position: fixed;
    top: 140px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

}
</style>