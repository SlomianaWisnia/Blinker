<template>
	<div :class="$style.profile" @click="goToProfile">
		<UserAvatar />
		<div :class="$style.profileInfo">
			<h3>{{ loggedInUserInfo.username }}</h3>
			<p>{{ loggedInUserInfo.email }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import UserAvatar from '@/components/reusable/UserAvatar.vue';

const store = useStore();
const router = useRouter();

const loggedInUserInfo = computed(() => {
	return store.state.loggedInUserData.user;
});

const goToProfile = () => {
	router.push('/profile');
};

</script>

<style module lang="scss">
.profile {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 0.5rem 0 2.5rem 0;
	padding: 0 2.2rem;

	.profileInfo {
		h3 {
			font-size: 1.3rem;
		}

		p {
			opacity: 0.7;
			margin-top: 0.3rem
		}
	}

}
</style>