<template>
	<ErrorMessage v-if="state.error" :message="state.errorMessage" />
	<button @click="optionsSaveHandler" :class="$style.saveBtn" :disabled="state.loading || props.disabled">
		<HalfCircleSpinner v-if="state.loading && !state.error" color=#dfeed8 :size=30 :class="$style.optSaveBtn" />
		<img :src=doneIcon v-if="state.isDone" :class="$style.doneIcon" alt="Icon marking that the action succeded">
		<p v-if="!state.loading && !state.isDone">Save</p>
	</button>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { HalfCircleSpinner } from 'epic-spinners';
import ErrorMessage from '@/components/reusable/ErrorMessage.vue';
import doneIcon from '@/assets/icons/forms/done.svg';

const store = useStore();

const addOptionsToLocalStore = () => {
	if (props.payload) {
		if ('username' in props.payload) {
			store.commit('changeUsername', props.payload.username);
		} else if ('avatar' in props.payload) {
			store.commit('addUserAvatar', props.payload);
		}
	}
};

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

const optionsSaveHandler = async () => {
	state.loading = true;
	state.isDone = false;

	try {
		await axios.put(`${props.endpoint}`,
			props.payload
		);
		addOptionsToLocalStore();
	} catch (error: unknown) {
		if (error instanceof Error) {
			state.error = true;
			state.errorMessage = error.message;
			console.error(error.message);
		}
	} finally {
		state.loading = false;
		state.isDone = true;
		setTimeout(() => {
			state.isDone = false;
		}, 1500);
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

}

.optSaveBtn {
	position: absolute !important;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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
