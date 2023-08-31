<template>
	<div :class="$style.profilePhotoEdit">
		<UserAvatar :size="110" />
	</div>
</template>

<script setup lang="ts">
import UserAvatar from '@/components/reusable/UserAvatar.vue';
</script>

<style module lang="scss">
.profilePhotoEdit {
	@include flex-center;
	flex-direction: column;
	gap: 1.2rem;
	margin-top: 1rem;

}
</style>
