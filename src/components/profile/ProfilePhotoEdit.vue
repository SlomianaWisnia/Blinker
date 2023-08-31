<template>
	<div :class="$style.profilePhotoEdit">
		<UserAvatar :size="140" />
		<div :class="$style.options">
			<div>
				<img :src="cameraIcon" alt="camera icon">
				<p>Camera</p>
			</div>
			<div>
				<img :src="photoIcon" alt="photo icon">
				<p>Photo</p>
			</div>
		</div>
		<OptionsSaveButton />
	</div>
</template>

<script setup lang="ts">
import UserAvatar from '@/components/reusable/UserAvatar.vue';
import cameraIcon from '@/assets/icons/profile/camera.svg';
import photoIcon from '@/assets/icons/profile/photo.svg';
import OptionsSaveButton from '@/components/reusable/OptionsSaveButton.vue';
</script>

<style module lang="scss">
.profilePhotoEdit {
	@include flex-center;
	flex-direction: column;
	gap: 1.2rem;
	margin-top: 1rem;

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
