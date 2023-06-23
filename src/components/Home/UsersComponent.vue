<template>
  <!-- <li v-for="friend in friends" :class="$style.friend">
    <p v-if="!friend.avatar" :class="$style.avatar">{{ friend.username.charAt(0).toUpperCase() }}</p>
    <img v-if="friend.avatar" :src="friend.avatar" alt="">
    <div :class="$style.info">
      <h4>{{ friend.username }}</h4>
      <p>{{friend.lastMessage}}</p>
    </div>
  </li> -->
</template>

<script lang="ts">
// import Friend from '../../interfaces/Friend';
export default {
  name: 'UsersComponent',
  // props: {
  //   // friends: Array<Friend>
  // },
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