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

const onImageChange = (event) => {
	if (event.target.files && event.target.files[0]) {
		emit('imageChange', URL.createObjectURL(event.target.files[0]));
	}
	hiddenFileInput.value!.value = '';
};

</script>
<style module lang="scss"></style>