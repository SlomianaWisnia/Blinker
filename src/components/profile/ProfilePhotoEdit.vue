<template>
	<div :class="$style.profilePhotoEdit">
		<div :class="$style.avatar">
			<UserAvatar :avatar="isPreview" @handleImgError="handleImgError" :size="140" />
			<img :src=closeIcon alt="Button to delete image" v-if="isAvatarDefault" :class="$style.cancelIcon"
				@click="deleteImage">
		</div>
		<div :class="$style.options">
			<CameraCapture @photoTake="onPhotoTaken" />
			<PhotoUpload @imageChange="onImageChange" />
		</div>
		<OptionsSaveButton :payload="{ avatar: image }" :disabled=!isImageModified endpoint="/user/update-avatar" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import UserAvatar from '@/components/reusable/UserAvatar.vue';
import closeIcon from '@/assets/icons/navigation/close.svg';
import OptionsSaveButton from '@/components/reusable/OptionsSaveButton.vue';
import PhotoUpload from './PhotoUpload.vue';
import CameraCapture from './CameraCapture.vue';
import CameraData from '@/interfaces/CameraData.ts';

const store = useStore();

const isImageInvalid = ref(false);
let baseImage = `http://localhost:3002/media/users/${store.state.loggedInUserData.user.username}/avatar/${store.state.loggedInUserData.user.avatar}`;
const image = ref(baseImage);

const isAvatarDefault = computed(() => {
	return image.value;
});

const isPreview = computed(() => {
	return store.state.loggedInUserData.user.avatarPreview ? store.state.loggedInUserData.user.avatarPreview : baseImage;
});

const isImageModified = computed(() => {
	if (!store.state.loggedInUserData.user.avatar && image.value === null) {
		return false;
	}
	return image.value !== store.state.loggedInUserData.user.avatar;
});

const onPhotoTaken = (data: CameraData) => {
	image.value = data.image_data_url;
};

const onImageChange = (newImage: string) => {
	image.value = newImage;
	store.commit('addUserAvatarPreview', newImage);
};

const deleteImage = () => {
	image.value = '';
	baseImage = '';
	store.commit('addUserAvatarPreview', '');
};

const handleImgError = () => {
	isImageInvalid.value = !isImageInvalid.value;
};
</script>

<style module lang="scss">
.profilePhotoEdit {
	@include flex-center;
	flex-direction: column;
	gap: 1.2rem;
	margin-top: 1rem;

	.avatar {
		position: relative;

		.cancelIcon {
			position: absolute;
			top: 10px;
			right: -10px;
			width: 32px;
			background-color: $bg-color-secondary;
			padding: 0.1rem;
			border-radius: 100%;
			cursor: pointer;

			&:hover {
				background-color: lighten($bg-color-secondary, 4%);
			}
		}


	}

	.options {
		@include flex-center;
		gap: 2rem;

		img {
			width: 58px;
			border-radius: 1.25rem;
			padding: 0.7rem;
			background-color: lighten($bg-color-secondary, 1%);
			cursor: pointer;
		}

		img:hover {
			background-color: lighten($bg-color-secondary, 4%);
		}

		p {
			text-align: center;
			margin-top: 0.4rem;
		}

		input[type=file] {
			position: fixed;
			z-index: -100;
			opacity: 0;
			width: 58px;
			height: 58px;
		}
	}

}
</style>