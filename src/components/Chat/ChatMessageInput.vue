<template>
	<div class="chatMessageInput">
		<div class="chatMedia">
			<img v-if="areMediaHidden" :src="show_media" id="showMediaIcon" @click="switchMediaVisibility" alt="">
			<div v-if="!areMediaHidden" class="visibleMedia">
				<CameraCapture @imageChange="" />
				<PhotoUpload />
				<img :src="voice_message" alt="">
			</div>
		</div>
		<div class="chatBar">
			<FormKit type="form" id="messageForm" @submit="sendMessage" :actions="false" :errors="[]">
				<FormKit type="textarea" name="message" id="message" placeholder="Aa" validation="required"
					validation-visibility="submit" :validation-messages="{
						required: 'Message is empty!'
					}" wrapper-class="chatBox" rows="1" @focus="switchMediaVisibility" @blur="switchMediaVisibility" />
			</FormKit>
			<div class="chatMedia">
				<img :src="emoji_menu" alt="">
			</div>
		</div>
		<img :src="send" class="sendIcon" alt="" @click="submitForm('messageForm')">
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { reset, submitForm } from '@formkit/vue';
import CameraCapture from '@/components/profile/CameraCapture.vue';
import PhotoUpload from '@/components/profile/PhotoUpload.vue';
import send from '@/assets/icons/chats/send.svg';
import emoji_menu from '@/assets/icons/chats/emoji_menu.svg';
import voice_message from '@/assets/icons/chats/voice_message.svg';
import show_media from '@/assets/icons/chats/show_media.svg';

interface MessageData {
	message: string;
}

const areMediaHidden = ref(false);

const switchMediaVisibility = () => {
	areMediaHidden.value = !areMediaHidden.value;
};

const route = useRoute();

const currentChatId = computed(() => {
	return route.params.chatId;
});

const sendMessage = (data: MessageData) => {
	axios.put(`/send-message/${currentChatId.value}`, {
		message: data.message
	}).then(() => {
		reset('messageForm');
	});
};
</script>

<style lang="scss">
.chatMessageInput {
	display: flex;
	background-color: $bg-color-secondary;
	gap: 0.3rem;
	padding: 0.3rem 0.5rem;
	position: fixed;
	bottom: 0;
	width: 100%;

	.chatBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: $bg-color-primary;
		width: 100%;
		border-radius: 1.25rem;
		padding: 0 0.5rem;
	}

	.chatMedia {
		@include flex-center;

		#showMediaIcon {
			position: relative;
			right: -3px;
			width: 38px;
			padding: 0;
		}

		.visibleMedia {
			display: flex;
			flex-direction: row;
		}

		img {
			width: 45px;
			border-radius: 1.25rem;
			padding: 8px;
			cursor: pointer;
		}

		img:hover {
			background-color: lighten($bg-color-secondary, 3%);
		}

		p {
			display: none;
		}

	}

	.sendIcon {
		border-radius: 50%;
		width: 48px;
		height: 48px;
		padding-left: 5px;
		padding: 8px;

		&:hover {
			background-color: lighten($bg-color-secondary, 3%);
		}
	}

	#messageForm-incomplete {
		display: none;
	}

	.formkit-inner {
		.formkit-input {
			background-color: $bg-color-primary;
			border: none;
			padding: 0.7rem;
			margin-top: 4px;
			color: $txt-color-primary;
			font-size: 1rem;
			width: 100%;
			resize: none;
		}
	}

}
</style>