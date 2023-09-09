<template>
	<div class="usernameEdit">
		<FormKit type="text" outer-class="usernameInput" help="At least 3 characters" :value=newUsername
			v-model="newUsername" />
		<OptionsSaveButton :disabled="!isUsernameModified || newUsername.length <= 3" endpoint="/user/update-username"
			:payload="{ username: newUsername }" />
	</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { FormKit } from '@formkit/vue';
import OptionsSaveButton from '@/components/reusable/OptionsSaveButton.vue';

const store = useStore();

const currentUsernameValue = computed(() => {
	return store.state.loggedInUserData.user.username;
});

const newUsername = ref(currentUsernameValue.value);

const isUsernameModified = computed(() => {
	if (newUsername.value === currentUsernameValue.value) {
		return false;
	} else {
		return true;
	}
});

</script>
<style lang="scss">
.usernameEdit {
	text-align: center;

	.usernameInput {
		.formkit-input {
			border: none;
			border-bottom: 1px solid white;
			background-color: $bg-color-secondary;
			caret-color: $txt-color-primary;
			color: $txt-color-primary;
			border-radius: 0.1rem;
			height: 2.2rem;
			padding-left: 0.5rem;
			margin-bottom: 1rem;
			width: 80%;
			font-size: 1.1rem;
		}

		.formkit-help {
			text-align: left;
			padding-left: 10%;
			font-size: 0.85rem;
			margin-top: -0.7rem;
			opacity: 0.7;
		}
	}
}
</style>