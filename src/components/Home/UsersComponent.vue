<template>
  <li v-for="user in users" :class="$style.user">
    <p v-if="!user.avatar" :class="$style.avatar">{{ user.name.charAt(0).toUpperCase() }}</p>
    <img v-if="user.avatar" :src="user.avatar" alt="">
    <div :class="$style.info">
      <h4>{{ user.name }}</h4>
      <p>{{ user.lastMessage }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import User from '../../interfaces/User.ts';
export default {
  name: 'UsersComponent',
  props: {
    users: Array<User>
  },
}
</script>

<style module lang="scss">
.user {
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: $txt-color-primary;

  .avatar {
    @include flex-center;
    font-size: 1.2rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background-color: grey;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  }

  .info {
    width: 75%;

    p {
      margin-top: 0.5rem;
    }
  }
}
</style>