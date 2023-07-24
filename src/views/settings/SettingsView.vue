<template>
  <main :class="$style.settingsPage">
    <div :class="$style.profile">
      <UserAvatar :avatar="loggedInUserInfo.avatar" :usernameFirstLetter="loggedInUserInfo.username.charAt(0)" />
      <div :class="$style.profileInfo">
        <h3>{{ loggedInUserInfo.username }}</h3>
        <p>{{ loggedInUserInfo.email }}</p>
      </div>
    </div>
    <div :class="$style.settingsTabs">
      <router-link v-for="tab in settingsTabs" :to="tab.to" :key="tab.to">
        <img :src="tab.icon" :alt="tab.title">
        <p>{{ tab.title }}</p>
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';
import generalIcon from '@/assets/icons/settings/general.svg';
import appearanceIcon from '@/assets/icons/settings/appearance.svg';
import chatIcon from '@/assets/icons/footer/chat.svg';
import callIcon from '@/assets/icons/footer/call.svg';
import notificationsIcon from '@/assets/icons/settings/notifications.svg';
import privacyIcon from '@/assets/icons/settings/privacy.svg';

const store = useStore()

const settingsTabs = [
  {
    title: 'General',
    to: '/settings/general',
    icon: generalIcon
  },
  {
    title: 'Appearance',
    to: '/settings/appearance',
    icon: appearanceIcon
  },
  {
    title: 'Chats',
    to: '/settings/chats',
    icon: chatIcon
  },
  {
    title: 'Calls',
    to: '/settings/calls',
    icon: callIcon
  },
  {
    title: 'Notifications',
    to: '/settings/notifications',
    icon: notificationsIcon
  },
  {
    title: 'Privacy',
    to: '/settings/privacy',
    icon: privacyIcon
  },
]


const loggedInUserInfo = computed(() => {
  return store.state.loggedInUserData.user
})
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

    .profileInfo {
      h3 {
        font-size: 1.4rem;
      }

      p {
        opacity: 0.7;
        margin-top: 0.3rem
      }
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