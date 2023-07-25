<template>
  <div :class="$style.profile">
    <UserAvatar :avatar="loggedInUserInfo.avatar" :usernameFirstLetter="loggedInUserInfo.username.charAt(0)" />
    <div :class="$style.profileInfo">
      <h3>{{ loggedInUserInfo.username }}</h3>
      <p>{{ loggedInUserInfo.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';

const store = useStore()

const loggedInUserInfo = computed(() => {
  return store.state.loggedInUserData.user
})
</script>

<style module lang="scss">
.profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0 2.5rem 0;
  padding: 0 1.5rem;

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
</style>