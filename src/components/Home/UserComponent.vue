<template>
	<li v-if="chat.friend" :class="$style.friend" @click="goToChat()">
		<UserAvatar :avatar="chat.friend.avatar" :username="chat.friend.username" :avatarHex="chat.friend.avatarHex" />
		<div :class="$style.info">
			<h4>{{ chat.friend.username }}</h4>
			<p>{{ lastMessageType }}</p>
		</div>
		<p :class="$style.date">{{ getMessageDate(lastMessageDate) }}</p>
	</li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import getMessageDate from '@/helpers/getMessageDate';
import UserAvatar from '@/components/reusable/UserAvatar.vue';
import Chats from '@/interfaces/Chats';

const router = useRouter();
const store = useStore();

const props = defineProps({
	chat: {
		type: Object as () => Chats,
		required: true,
	},
});

const lastMessageType = computed(() => {
	const { last_message } = props.chat;
	const { loggedInUserData } = store.state;

	if (last_message.message) {
		return last_message.message;
	} else {
		return last_message.from.username === loggedInUserData.user.username
			? 'You sent a media file.'
			: 'Received a media file.';
	}
});

const lastMessageDate = computed(() => {
	const { last_message } = props.chat;
	return typeof last_message.createdAt === 'string'
		? new Date(last_message.createdAt)
		: last_message.createdAt;
});

const goToChat = () => {
	router.push(`/chat/${props.chat.id}`);
};
</script>

<style module lang="scss">
.friend {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	color: $txt-color-primary;

	.info {
		width: 60%;

		p {
			margin-top: 0.5rem;
		}
	}

	.date {
		width: 14%;
		text-align: right;
	}
}
</style>