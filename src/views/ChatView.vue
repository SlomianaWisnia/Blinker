<template>
  <main :class="$style.chatPage">
    <div :class="$style.chatMessages" ref="el">
      <ChatMessage v-for="message in messages" :message="message.message" :date="message.createdAt"
        :class="$style[checkMessageSender(message)]" />
    </div>
  </main>
</template>
<script setup lang="ts">
import ChatMessage from '../components/Chat/ChatMessage.vue'
import axios from 'axios';
import store from '../store';
import { AxiosResponse } from 'axios';
import { ref, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const AMOUNT_TO_FETCH = 10

const route = useRoute()
const chatId = route.params.chatId

const messages = reactive([] as Array<AxiosResponse>)
const messagesAmount = ref(AMOUNT_TO_FETCH)
const reachedMax = ref(false)


const fetchLastMessages = () => {
  axios.get(`/messages/${chatId}/${messagesAmount.value - AMOUNT_TO_FETCH}/${messagesAmount.value}`).then(res => {
    messages.unshift(...res.data.messages.reverse())
    reachedMax.value = res.data.reachedMax
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

const checkMessageSender = (message: any) => {
  return message.from.username === store.state.user_info.user.username ? 'userMessage' : 'friendMessage'
}

window.addEventListener("scroll", handleInfiniteScroll);
</script>
<style module lang="scss">
.chatPage {
  background-color: $bg-color-primary;
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
    justify-content: flex-end;
    gap: 2rem;
    min-height: 100vh;
    margin: 6rem 0 4rem 0;

    .userMessage {
      align-self: flex-end;
    }

    .friendMessage {
      align-self: flex-start;
    }
  }
}
</style>