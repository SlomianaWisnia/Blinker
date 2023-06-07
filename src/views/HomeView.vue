<script lang="ts">

export default {
  name: 'HomeView',
  data() {
    return {
      users: [{ name: 'Wiśnia', avatar: null, lastMessage: 'Witam serdecznie pana Wisnie' }]
    }
  }
}
</script>

<template>
  <main>
    <section v-if="users.length === 0" :class="$style.empty">
      <p>No chats yet.</p>
      <p>Get started by messaging a friend.</p>
    </section>
    <ul v-if="users.length > 0" :class="$style.users">
      <li v-for="user in users" :class="$style.user">
        <p v-if="!user.avatar" :class="$style.avatar">{{ user.name.charAt(0).toUpperCase() }}</p>
        <img v-if="user.avatar" :src="user.avatar" alt="">
        <div :class="$style.info">
          <h4>{{ user.name }}</h4>
          <p>{{ user.lastMessage }}</p>
        </div>
      </li>
    </ul>
  </main>
</template>

<style module lang="scss">
@use '../main.scss' as *;

main {
  background-color: $bg-color-primary;
  min-height: 100vh;
  padding: 0.8rem;

  .empty {
    color: $txt-color-primary;
    text-align: center;
    margin-top: 2rem;

  }

  .users {
    margin-top: 1rem;

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

  }
}
</style>