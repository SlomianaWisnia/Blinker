<template>
	<Transition name="modalFade">
		<div class="modalBackdrop">
			<div class="modal">
				<img :src=closeIcon class="modalCloseBtn" @click="props.close" alt="Icon to close the modal">
				<slot name="content">
					This is the default modal!
				</slot>
			</div>
		</div>
	</Transition>
</template>
<script setup lang="ts">
import closeIcon from '@/assets/icons/navigation/close.svg';
const props = defineProps({
	close: {
		type: Function,
		required: true
	}
});
</script>
<style scoped lang="scss">
.modalBackdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	position: relative;
	display: flex;
	flex-direction: column;
}

.modalCloseBtn {
	position: absolute;
	width: 30px;
	right: 0;
	top: -30px;
}

.modalFade-enter-from,
.modalFade-leave-to {
	opacity: 0;
}

.modalFade-enter-active,
.modalFade-leave-active {
	transition: opacity 0.2s ease;
}
</style>