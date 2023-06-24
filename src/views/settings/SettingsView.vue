<template>
  <main :class="$style.settingsPage">
    <div :class="$style.profile">
      <img v-if="user_info.avatar" :src="user_info.avatar" alt="">
      <p :class="$style.defaultAvatar" v-if="!user_info.avatar">{{ user_info.username.charAt(0) }}</p>
      <div :class="$style.profile_info">
        <h3>{{ user_info.username }}</h3>
        <p>{{ user_info.email }}</p>
      </div>
    </div>
    <div :class="$style.settingsTabs">
      <router-link to='/settings/general'><img src="../../assets/icons/settings/general.svg" alt="">
        <p>General</p>
      </router-link>
      <router-link to="/settings/appearance"><img src="../../assets/icons/settings/appearance.svg" alt="">
        <p>Appearance</p>
      </router-link>
      <router-link to="/settings/chats"><img src="../../assets/icons/footer/chat.svg" alt="">
        <p>Chats</p>
      </router-link>
      <router-link to="/settings/calls"><img src="../../assets/icons/footer/call.svg" alt="">
        <p>Calls</p>
      </router-link>
      <router-link to="/settings/notifications"><img src="../../assets/icons/settings/notifications.svg" alt="">
        <p>Notifications</p>
      </router-link>
      <router-link to="/settings/privacy"><img src="../../assets/icons/settings/privacy.svg" alt="">
        <p>Privacy</p>
      </router-link>
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
  display: flex;
  flex-direction: column;
  background-color: $bg-color-primary;
  min-height: 87vh;
  padding: 0 1.5rem;
  color: $txt-color-primary;

  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.5rem 0 2.5rem 0;

    h3 {
      font-size: 1.4rem;
    }

    p {
      opacity: 0.7;
      margin-top: 0.3rem
    }

    .defaultAvatar,
    img {
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

  .settingsTabs {
    display: flex;
    flex-direction: column;

    a {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;
      color: inherit;
      font-size: 1.15rem;
      margin-bottom: 2rem;

      img {
        width: 27px;
      }
    }

    a:nth-of-type(2),
    a:nth-of-type(4) {
      border-bottom: 1px solid rgba(128, 128, 128, 0.336);
      padding-bottom: 2rem;
    }

  }
}
</style>  