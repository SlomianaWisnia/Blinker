<template>
  <main :class="$style.settingsPage">
    <div :class="$style.profile">
      <img v-if="user_info.avatar" :src="user_info.avatar" alt="">
      <p :class="$style.defaultAvatar">{{ user_info.username.charAt(0) }}</p>
      <div :class="$style.profile_info">
        <h3>{{ user_info.username }}</h3>
        <p>{{ user_info.email }}</p>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import store from '../../store';
import User from '../../interfaces/User'

export default {
  computed: {
    user_info(): User {
      return store.state.user_info.user
    }
  }
}
</script>
<style module lang="scss">
.settingsPage {
  background-color: $bg-color-primary;
  min-height: 90vh;
  padding: 2rem;

  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: $txt-color-primary;

    .defaultAvatar {
      @include flex-center;
      font-size: 1.4rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: #52796F;
      box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
      color: white;
    }
  }
}
</style>  