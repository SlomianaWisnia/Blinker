<template>
	<div>
		<img :src="cameraIcon" alt="camera icon" @click="showModal">
		<p>Camera</p>
	</div>
	<ModalComponent v-show="isModalVisible" :close="closeModal">
		<template v-slot:content>
			<div :class="$style.webCam">
				<WebCamUI fullScreenState="false" :fullscreenButton="{ default: false }" @photoTaken="onCameraCapture" />
			</div>
		</template>
	</ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { WebCamUI } from 'vue-camera-lib';
import cameraIcon from '@/assets/icons/profile/camera.svg';
import ModalComponent from '@/components/reusable/ModalComponent.vue';
import CameraData from '@/interfaces/CameraData.ts';

const emit = defineEmits(['photoTake']);

const isModalVisible = ref(false);

const showModal = () => {
	isModalVisible.value = true;
};

const closeModal = () => {
	isModalVisible.value = false;
};

const onCameraCapture = (data: CameraData) => {
	emit('photoTake', data);
};

</script>

<style module lang="scss">
.webCam {
	color: black;
	text-align: center;

	button {
		font-size: 1rem;
		color: $txt-color-primary;
		border-radius: 0.5rem;
		border: none;
		padding: 0.7rem 1.8rem;
		background-color: lighten($bg-color-secondary, 1%) !important;
		cursor: pointer;
		margin-top: 1rem;

		&:hover {
			background-color: lighten($bg-color-secondary, 4%) !important;
		}

	}

}
</style>