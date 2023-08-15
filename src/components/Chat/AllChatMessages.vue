<template>
  <div :class="$style.chatMessages">
    <HalfCircleSpinner v-if="state.loading && !state.error" color=#dfeed8 />
    <ErrorMessage v-if="state.error" :message="state.errorMessage" />
    <p :class="$style.noMessages" v-if="state.messages.length === 0 && !state.loading">No messages yet!</p>
    <ChatMessage v-else v-for="message in state.messages" :key="message.createdAt" :message="message.message"
      :date="message.createdAt" :class="$style[checkMessageSender(message)]" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import ChatMessage from '@/components/Chat/ChatMessage.vue'
import Message from '@/interfaces/Message';
import { HalfCircleSpinner } from 'epic-spinners'
import ErrorMessage from '@/components/reusable/ErrorMessage.vue'

const AMOUNT_TO_FETCH = 10
const store = useStore()
const route = useRoute()

const chatId = route.params.chatId

const state = reactive({
  messages: [] as Array<Message>,
  messagesAmount: AMOUNT_TO_FETCH,
  reachedMax: false,
  loading: false,
  error: false,
  errorMessage: '',
})

const fetchLastMessages = async () => {
  state.loading = true;

  try {
    const res = await axios.get(`/messages/${chatId}/${state.messagesAmount - AMOUNT_TO_FETCH}/${state.messagesAmount}`);
    const newMessages = res.data.messages.reverse();
    state.messages.unshift(...newMessages);
    state.reachedMax = res.data.reachedMax;
  } catch (error: unknown) {
    if (error instanceof Error) {
      state.error = true;
      state.errorMessage = error.message;
      console.error(error.message);
    }
  } finally {
    state.loading = false;
  }
};

const handleInfiniteScroll = () => {
  if (!state.error) {
    const isAtTopOfPage = window.scrollY <= 20;
    if (isAtTopOfPage && !state.reachedMax) {
      state.messagesAmount += AMOUNT_TO_FETCH;
    }
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