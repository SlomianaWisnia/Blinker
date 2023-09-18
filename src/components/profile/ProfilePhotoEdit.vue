<template>
	<div :class="$style.profilePhotoEdit">
		<div :class="$style.avatar">
			<UserAvatar :avatar="isPreview" :avatarHex="avatarHex" :username="username" @handleImgError="handleImgError"
				:size="140" />
			<img :src=closeIcon alt="Button to delete image" v-if="!isAvatarDefault" :class="$style.cancelIcon"
				@click="deleteImage">
		</div>
		<div :class="$style.options">
			<CameraCapture @photoTake="onCameraCapture" />
			<PhotoUpload @imageChange="onImageChange" />
		</div>
		<OptionsSaveButton :payload="{ avatar: image }" @switchIsImgSavedTrue=switchIsImgSavedTrue
			:disabled="!isImageModified || isImgSaved" endpoint="/user/update-avatar" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import UserAvatar from '@/components/reusable/UserAvatar.vue';
import closeIcon from '@/assets/icons/navigation/close.svg';
import OptionsSaveButton from '@/components/reusable/OptionsSaveButton.vue';
import PhotoUpload from './PhotoUpload.vue';
import CameraCapture from './CameraCapture.vue';
import CameraData from '@/interfaces/CameraData.ts';
import getLoggedInUserProfileInfo from '@/helpers/getLoggedInUserProfileInfo';
import convertBlobToFile from '@/helpers/convertBlobToFile';

const { avatar, avatarHex, username } = getLoggedInUserProfileInfo();

const isImageInvalid = ref(false);
const image = ref(avatar);
const avatarPreview = ref();
const isImgSaved = ref(false);

const switchIsImgSavedTrue = () => isImgSaved.value = true;

const switchIsImgSavedFalse = () => isImgSaved.value = false;

const isAvatarDefault = computed(() => !image.value);

const isImageModified = computed(() => image.value != avatar);

const isPreview = computed(() => avatarPreview.value ? avatarPreview.value : image.value);

const onCameraCapture = (data: CameraData) => {
	avatarPreview.value = URL.createObjectURL(data.blob);
	image.value = convertBlobToFile(data.blob, 'avatar');
};

const onImageChange = (newImage: File) => {
	image.value = newImage;
	avatarPreview.value = URL.createObjectURL(newImage);
	switchIsImgSavedFalse();
};

const deleteImage = () => {
	image.value = '';
	avatarPreview.value = null;
	switchIsImgSavedFalse();
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
	}
}
</style>