<template>
  <HalfCircleSpinner v-if="state.loading && !state.error" color=#dfeed8 />
  <ErrorMessage v-if="state.error" :message="state.errorMessage" />
  <NoChats v-if="state.chats.length === 0 && !state.loading" />
  <ul v-else :class="$style.chatsList">
    <UserComponent v-for="chat in state.chats" :key="chat.id" :chat="chat" />
  </ul>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import UserComponent from '@/components/Home/UserComponent.vue';
import FetchedChats from '@/interfaces/FetchedChats';
import Chats from '@/interfaces/Chats';
import NoChats from './NoChats.vue';
import { HalfCircleSpinner } from 'epic-spinners';
import ErrorMessage from '@/components/reusable/ErrorMessage.vue';

const store = useStore();

const state = reactive({
	chats: [] as Array<Chats>,
	loading: false,
	error: false,
	errorMessage: '',
});

const getChatrooms = async () => {
	state.loading = true;
	try {
		const res = await axios.get('/get-last-messages');

		const loggedInUserUsername = store.state.loggedInUserData.user.username;
		const fetchedChats: Array<FetchedChats> = res.data.chats;
		state.chats = fetchedChats.map(({ _id, messages, members }) => {
			const last_message = messages[0];
			const friend = members.find(({ username }) => username !== loggedInUserUsername);
			return { id: _id, friend, last_message };
		});
		console.log(state.chats);

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

onMounted(getChatrooms);

</script>
<style module lang="scss">
.chatsList {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 2.5rem;
  margin-top: 1rem;
}

.noChats {
  color: $txt-color-primary;
  text-align: center;
  margin-top: 3rem;
}
</style>