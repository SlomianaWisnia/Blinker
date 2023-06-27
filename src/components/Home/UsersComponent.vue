<template>
  <li :class="$style.friend">
    <p v-if="chat.friend.avatar" :class="$style.avatar">{{ chat.friend.username.charAt(0).toUpperCase() }}</p>
    <img v-if="chat.friend.avatar" :src="chat.friend.avatar" alt="">
    <div @click="goToChat()" :class="$style.info">
      <h4>{{ chat.friend.username }}</h4>
      <p>{{ chat.last_message.message }}</p>
    </div>
    <p @click="goToChat()" :class="$style.date">{{ getDate() }}</p>
  </li>
</template>

<script lang="ts">
import getMessageDate from '../../helpers/getMessageDate'

export default {
  name: 'UsersComponent',
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getDate() {
      return getMessageDate(this.chat.last_message.created)
    },
    goToChat() {
      this.$router.push(`/chat/${this.chat.id}`)
    }
  },
}
</script>

<style module lang="scss">
.friend {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  color: $txt-color-primary;

  .avatar {
    @include flex-center;
    font-size: 1.2rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background-color: grey;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
    width: 10%;
  }

  .info {
    width: 70%;

    p {
      margin-top: 0.5rem;
    }
  }
}
</style>
