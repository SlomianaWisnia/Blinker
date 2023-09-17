<template>
	<div>
		<p v-if="!isImgValid || !props.avatar" :class="$style.avatarDefault"
			:style="{ width: sizePx, height: sizePx, fontSize: fontSizePx, backgroundColor: props.avatarHex }">
			{{ getCapitalizedFirstLetter(props.username) }}
		</p>
		<img @error="imgErrorHandler" :class="$style.avatarImg" :style="{ width: sizePx, height: sizePx }"
			v-if="isImgValid && props.avatar" :src="srcType" alt="" />
	</div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { ref } from 'vue';
import getCapitalizedFirstLetter from '@/helpers/getCapitalizedFirstLetter';

const emit = defineEmits(['handleImgError']);

const isImgValid = ref(true);
const props = defineProps({
	avatar: {
		type: String,
		default: undefined,
		required: true,
	},
	username: {
		type: String,
		default: null,
		required: true,
	},
	avatarHex: {
		type: String,
		default: undefined,
		required: true,
	},
	size: {
		type: Number,
		default: 40
	}
});

const srcType = computed(() => {
	return props.avatar?.slice(0, 4) === 'blob' ? props.avatar : `http://localhost:3002/media/users/${props.username}/avatar/${props.avatar}`;
});

watch(props, () => {
	isImgValid.value = true;
	emit('handleImgError');
});

const imgErrorHandler = () => {
	isImgValid.value = false;
	emit('handleImgError');
};

const sizePx = computed(() => `${props.size}px`);
const fontSizePx = computed(() => `${props.size * 0.45}px`);
</script>

<style module lang="scss">
.avatarDefault {
	@include flex-center;
	border-radius: 50%;
	box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
}

.avatarImg {
	border-radius: 50%;
	box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
	margin-right: 0.2rem;
}
</style>
