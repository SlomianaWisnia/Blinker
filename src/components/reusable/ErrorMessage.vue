<template>
	<p :class="$style.errorMsg">{{ props.message }}</p>
</template>
<script setup lang="ts">
const props = defineProps({
	message: {
		type: String,
		default: undefined,
	},
});
</script>
<style module lang="scss">
.errorMsg {
	position: fixed;
	top: 60%;
	text-align: center;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	color: #c54b12;
}
</style>