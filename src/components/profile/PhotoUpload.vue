<template>
	<div>
		<input type="file" accept="image/*" @change="onImageChange" ref="hiddenFileInput">
		<img :src="photoIcon" alt="photo icon" @click="handleImageUpload">
		<p>Photo</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import photoIcon from '@/assets/icons/profile/photo.svg';

const emit = defineEmits(['imageChange']);
const hiddenFileInput = ref<null | HTMLInputElement>(null);

const handleImageUpload = () => {
	hiddenFileInput.value!.click();
};

interface FileChangeEvent extends Event {
	target: HTMLInputElement;
}

const onImageChange = (event: FileChangeEvent) => {
	if (event.target.files && event.target.files[0]) {
		emit('imageChange', event.target.files[0]);
	}
	hiddenFileInput.value!.value = '';
};
</script>

<style module lang="scss"></style>
