<template>
	<ErrorMessage v-if="state.error" :message="state.errorMessage" />
	<button @click="optionsSaveHandler" :class="$style.saveBtn" :disabled="state.loading || props.disabled">
		<HalfCircleSpinner v-if="state.loading && !state.error" color=#dfeed8 :size=30 :class="$style.spinner" />
		<img :src=doneIcon v-if="state.isDone && !state.error" :class="$style.doneIcon"
			alt="Icon marking that the action succeded">
		<p v-if="!state.loading && !state.isDone">Save</p>
	</button>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { HalfCircleSpinner } from 'epic-spinners';
import ErrorMessage from '@/components/reusable/ErrorMessage.vue';
import doneIcon from '@/assets/icons/forms/done.svg';

const store = useStore();
const fd = new FormData();
const axiosConfig = {
	headers: {},
};

const emit = defineEmits(['switchIsImgSavedTrue']);

const props = defineProps({
	payload: {
		type: Object,
		default: undefined,
	},
	endpoint: {
		type: String,
		default: undefined
	},
	disabled: {
		type: Boolean,
		default: undefined,
	}
});

const state = reactive({
	loading: false,
	error: false,
	errorMessage: '',
	isDone: false,
});

const setMultiPartData = () => {
	if (props.payload) {
		if ('avatar' in props.payload) {
			axiosConfig.headers['Content-Type'] = 'multipart/form-data';
			fd.set('avatar', props.payload.avatar);
			// eslint-disable-next-line
			return fd as FormData as any;
		} else {
			return props.payload;
		}
	}
};

const addOptionsToLocalStore = () => {
	if (props.payload) {
		if ('username' in props.payload) {
			store.commit('changeUsername', props.payload.username);
		} else if ('avatar' in props.payload) {
			const objectURL = !props.payload.avatar.length ? props.payload.avatar : URL.createObjectURL(props.payload.avatar);
			store.commit('changeUserAvatar', objectURL);
		}
	}
};

const isAvatarEmpty = computed(() => typeof props.payload?.avatar === 'string' ? props.payload.avatar.trim() === '' : true);

const optionsSaveHandler = async () => {
	state.loading = true;
	state.isDone = false;

	try {
		const data = setMultiPartData();
		if (isAvatarEmpty.value) {
			await axios.delete('/user/delete-avatar');
		} else {
			await axios.put(`${props.endpoint}`,
				data, axiosConfig
			);
		}
		emit('switchIsImgSavedTrue');
		addOptionsToLocalStore();
	} catch (error: unknown) {
		if (error instanceof Error) {
			state.error = true;
			state.errorMessage = error.message;
			console.error(error.message);
		}
	} finally {
		state.loading = false;
		if (!state.error) {
			state.isDone = true;
			setTimeout(() => {
				state.isDone = false;
			}, 1000);
		}
		delete axiosConfig.headers['Content-Type'];
	}
};
</script>

<style module lang="scss">
.saveBtn {
	position: absolute;
	bottom: 18px;
	right: 18px;
	font-size: 0.9rem;
	color: $txt-color-primary;
	border-radius: 1.25rem;
	border: none;
	height: 40px;
	width: 80px;
	background-color: lighten($bg-color-secondary, 1%);
	cursor: pointer;

	.spinner {
		position: absolute !important;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

}

.saveBtn:hover {
	background-color: lighten($bg-color-secondary, 4%);
}

.saveBtn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.doneIcon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30px;
}
</style>
