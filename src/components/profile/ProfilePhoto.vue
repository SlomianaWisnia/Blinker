<template>
	<div :class="$style.profilePhoto">
		<UserAvatar :avatar="avatar" :avatarHex="avatarHex" :username="username" :size="110" />
		<button @click="goToPhotoEdit">Edit photo</button>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import UserAvatar from '@/components/reusable/UserAvatar.vue';
import getLoggedInUserProfileInfo from '@/helpers/getLoggedInUserProfileInfo';

const { avatar, avatarHex, username } = getLoggedInUserProfileInfo();

const router = useRouter();

const goToPhotoEdit = () => {
	router.push('/profile/photo-edit');
};
</script>

<style module lang="scss">
.profilePhoto {
	@include flex-center;
	flex-direction: column;
	gap: 1.2rem;
	margin-top: 1rem;

	button {
		padding: 0.65rem 1rem;
		border-radius: 1.25rem;
		border: none;
		background-color: lighten($bg-color-secondary, 1%);
		font-size: 1rem;
		color: $txt-color-primary;
		cursor: pointer;


	}

	button:hover {
		background-color: lighten($bg-color-secondary, 4%);
	}
}
</style>
