<template>
  <li :class="$style.friend">
    <UserAvatar :avatar="chat.friend.avatar" :usernameLetter="chat.friend.username.charAt(0).toUpperCase()" />
    <div @click="goToChat()" :class="$style.info">
      <h4>{{ chat.friend.username }}</h4>
      <p>{{ checkMessageType }}</p>
    </div>
    <p @click="goToChat()" :class="$style.date">{{ getDate() }}</p>
  </li>
</template>

<script lang="ts">
import getMessageDate from '../../helpers/getMessageDate';
import UserAvatar from '../UserAvatar.vue';
import store from '../../store';

export default {
  name: 'UsersComponent',
  components: {
    UserAvatar,
  },
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
  computed: {
    checkMessageType() {
      if (this.chat.last_message.hasOwnProperty('message')) {
        return this.chat.last_message.message
      } else {
        return this.chat.last_message.from.username === store.state.user_info.user.username ? 'You sent a media file.' : 'Received a media file.'
      }
    }
  },
  methods: {
    getDate() {
      return getMessageDate(this.chat.last_message.created);
    },
    goToChat() {
      this.$router.push(`/chat/${this.chat.id}`);
    },
  },
};
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