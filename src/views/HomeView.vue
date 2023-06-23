<template>
  <main :class="$style.homePage">
    <section v-if="friends.length === 0" :class="$style.empty">
      <p>No chats yet.</p>
      <p>Get started by messaging a friend.</p>
    </section>
    <ul v-if="friends.length > 0" :class="$style.users">
      <UsersComponent />
    </ul>
  </main>
</template>

<script lang="ts">
import UsersComponent from '../components/Home/UsersComponent.vue';
import Friend from '../interfaces/Friend'
import store from '../store';

export default {
  name: 'HomeView',
  components: {
    UsersComponent,
  },
  computed: {
    friends(): Array<Friend> {
      return store.state.user_info.friends
    }
  }
}
</script>

<style module lang="scss">
.homePage {
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