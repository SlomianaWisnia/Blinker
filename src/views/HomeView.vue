<script lang="ts">
import UsersComponent from '../components/Home/UsersComponent.vue';

export default {
  name: 'HomeView',
  components: {
    UsersComponent,
  },
  data() {
    return {
      users: [{ name: 'Wiśnia', avatar: '', lastMessage: 'Witam serdecznie.' }]
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
      <UsersComponent :users="users" />
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
  }
}
</style>