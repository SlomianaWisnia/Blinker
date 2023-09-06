<template>
	<div :class="$style.profilePhotoEdit">
		<div :class="$style.avatar">
			<UserAvatar :avatar=image :size="140" />
			<img :src=closeIcon alt="Button to delete image" v-if="isAvatarDefault" :class="$style.cancelIcon"
				@click="deleteImage">
		</div>
		<div :class="$style.options">
			<div>
				<img :src="cameraIcon" alt="camera icon" @click="showModal">
				<p>Camera</p>
			</div>
			<div>
				<input type="file" accept="image/*" @change="onImageChange" ref="hiddenFileInput">
				<img :src="photoIcon" alt="photo icon" @click="handleImageUpload">
				<p>Photo</p>
			</div>
		</div>
		<OptionsSaveButton :payload=image :disabled=!isImageModified />

		<Modal v-show="isModalVisible" :close="closeModal">
			<template v-slot:content>
				<div :class="$style.webCam">
					<WebCamUI fullScreenState="false" fullscreenButton="false" @photoTaken="photoTaken" />
				</div>
			</template>
		</Modal>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import UserAvatar from '@/components/reusable/UserAvatar.vue';
import cameraIcon from '@/assets/icons/profile/camera.svg';
import photoIcon from '@/assets/icons/profile/photo.svg';
import closeIcon from '@/assets/icons/navigation/close.svg';
import OptionsSaveButton from '@/components/reusable/OptionsSaveButton.vue';
import { WebCamUI } from 'vue-camera-lib';
import Modal from '@/components/reusable/Modal.vue';

const store = useStore();

const hiddenFileInput = ref<null | HTMLInputElement>(null);
const image = ref(store.state.loggedInUserData.user.avatar);

const isModalVisible = ref(false);

const showModal = () => {
	isModalVisible.value = true;
};

const closeModal = () => {
	isModalVisible.value = false;
};

const photoTaken = (data) => {
	console.log('image blob: ', data.blob);
	console.log('image data url', data.image_data_url);
};

const isAvatarDefault = computed(() => {
	return image.value;
});

const isImageModified = computed(() => {
	if (!store.state.loggedInUserData.user.avatar && image.value === null) {
		return false;
	}
	return image.value !== store.state.loggedInUserData.user.avatar;
});

const handleImageUpload = () => {
	hiddenFileInput.value!.click();
};

const onImageChange = (event) => {
	if (event.target.files && event.target.files[0]) {
		image.value = URL.createObjectURL(event.target.files[0]);
	}
};

const deleteImage = () => {
	image.value = null;
	hiddenFileInput.value!.value = '';
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


	.webCam {
		color: black;
		text-align: center;

		button {
			font-size: 1rem;
			color: $txt-color-primary;
			border-radius: 0.5rem;
			border: none;
			padding: 0.7rem 1.8rem;
			background-color: lighten($bg-color-secondary, 1%);
			cursor: pointer;
			margin-top: 1rem;

			&:hover {
				background-color: lighten($bg-color-secondary, 4%);
			}

		}

	}

}
</style>