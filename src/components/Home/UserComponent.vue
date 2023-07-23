<template>
  <li :class="$style.friend" @click="goToChat()">
    <UserAvatar :avatar="chat.friend.avatar" :usernameLetter="chat.friend.username.charAt(0).toUpperCase()" />
    <div :class="$style.info">
      <h4>{{ chat.friend.username }}</h4>
      <p>{{ lastMessageType }}</p>
    </div>
    <p :class="$style.date">{{ getMessageDate(props.chat.last_message.created) }}</p>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import getMessageDate from '../../helpers/getMessageDate';
import UserAvatar from '../UserAvatar.vue';
import store from '../../store';
import Chats from '../../interfaces/Chats';

const router = useRouter()

const props = defineProps({
  chat: {
    type: Object as () => Chats,
    required: true,
  },
})

const lastMessageType = computed(() => {
  const { last_message } = props.chat
  const { loggedInUserData } = store.state

  if (last_message.message) {
    return last_message.message
  } else {
    return last_message.from.username === loggedInUserData.user.username ? 'You sent a media file.' : 'Received a media file.'
  }
})

const goToChat = () => {
  router.push(`/chat/${props.chat.id}`);
}
</script>

<style module lang="scss">
.friend {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  color: $txt-color-primary;

  .info {
    width: 70%;

    p {
      margin-top: 0.5rem;
    }
  }
}
</style>