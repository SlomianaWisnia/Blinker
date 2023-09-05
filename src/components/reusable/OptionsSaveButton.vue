<template>
	<ErrorMessage v-if="state.error" :message="state.errorMessage" />
	<button @click="optionsSaveHandler" :class="$style.saveBtn" :disabled="state.loading || props.disabled">
		<HalfCircleSpinner v-if="state.loading && !state.error" color=#dfeed8 :size=30 :class="$style.optSaveBtn" />
		<p v-if="!state.loading">Save</p>
	</button>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { HalfCircleSpinner } from 'epic-spinners';
import ErrorMessage from '@/components/reusable/ErrorMessage.vue';

const store = useStore();

const addUserAvatarToLocalStore = () => {
	store.commit('addUserAvatar', props.payload);
};

const props = defineProps({
	payload: {
		type: String,
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
});

const optionsSaveHandler = async () => {
	state.loading = true;

	try {
		await axios.put(`${props.endpoint}`,
			props.payload
		);
		addUserAvatarToLocalStore();
	} catch (error: unknown) {
		if (error instanceof Error) {
			state.error = true;
			state.errorMessage = error.message;
			console.error(error.message);
		}
	} finally {
		state.loading = false;
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
</style>
