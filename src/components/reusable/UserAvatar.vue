<template>
	<div>
		<p v-if="!props.avatar || !isImgValid" :class="$style.avatar"
			:style="{ width: sizePx, height: sizePx, fontSize: fontSizePx, backgroundColor: props.avatarHex ? props.avatarHex : loggedInUserInfo.avatarHex }">
			{{ getCapitalizedFirstLetter(props.username || loggedInUserInfo.username) }}
		</p>
		<img @error="imgErrorHandler" :class="$style.avatarImg" :style="{ width: sizePx, height: sizePx }"
			v-if="props.avatar && isImgValid" :src="props.avatar" alt="" />
	</div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import getCapitalizedFirstLetter from '@/helpers/getCapitalizedFirstLetter';

const store = useStore();
const emit = defineEmits(['handleImgError']);

const loggedInUserInfo = computed(() => {
	return store.state.loggedInUserData.user;
});


const isImgValid = ref(true);
const props = defineProps({
	avatar: {
		type: String,
		default: undefined,
	},
	username: {
		type: String,
		default: undefined,
	},
	avatarHex: {
		type: String,
		default: undefined,
	},
	size: {
		type: Number,
		default: 40
	}
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
.avatar {
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
