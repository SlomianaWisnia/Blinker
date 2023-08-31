<template>
	<FormKit type="submit" outer-class="submit" :disabled="props.loading">
		<p v-if="!props.loading">{{ props.type === 'login' ? 'Log in' : 'Sign Up' }}</p>
		<HalfCircleSpinner v-if="props.loading" color=#dfeed8 :size=30 />
	</FormKit>
</template>
<script setup lang="ts">
import { HalfCircleSpinner } from 'epic-spinners';

const props = defineProps({
	loading: {
		type: Boolean,
		default: undefined,
		required: true,
	},
	type: {
		type: String,
		required: true,
	}
});
</script>
<style lang="scss">
.submit {
	position: absolute;
	right: 30px;
	bottom: 20px;

	.formkit-input {
		position: relative;
		border-radius: 1.25rem;
		border: none;
		background-color: $bg-color-secondary;
		color: $txt-color-primary;
		height: 50px;
		width: 110px;
		cursor: pointer;

		div {
			margin: 0 auto;
		}

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
}
</style>