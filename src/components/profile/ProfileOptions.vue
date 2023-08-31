<template>
  <div :class="$style.profileOptions">
    <router-link v-for="option in profileOptions" :to="option.to" :key="option.to" :class="$style.option">
      <img :src="option.icon">
      <div>
        <h4>{{ option.title }}</h4>
        <p>{{ option.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import accountIcon from '@/assets/icons/profile/account.svg';
import aboutIcon from '@/assets/icons/profile/about.svg';
import badgesIcon from '@/assets/icons/profile/badges.svg';

const store = useStore();

const loggedInUserUserName = computed(() => {
	return store.state.loggedInUserData.user.username;
});

const profileOptions = [
	{
		title: loggedInUserUserName,
		icon: accountIcon,
		description: 'Your name',
		to: '/profile/name'
	},
	{
		title: 'About',
		icon: aboutIcon,
		description: 'Write a few words about yourself',
		to: '/profile/about'
	},
	{
		title: 'Badges',
		icon: badgesIcon,
		description: 'Check out your collection',
		to: '/profile/badges'
	},

];
</script>

<style module lang="scss">
.profileOptions {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;


  .option {
    display: flex;
    gap: 1rem;
    color: $txt-color-primary;
    text-decoration: none;
    padding: 1.3rem 2rem;

    p {
      opacity: 0.8;
    }

    img {
      width: 30px;
    }
  }

  .option:hover {
    background-color: lighten($bg-color-secondary, 3%);
  }

}
</style>
