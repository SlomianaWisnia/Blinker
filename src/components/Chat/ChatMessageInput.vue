<template>
  <div class="chatMessageInput">
    <div class="chatBar">
      <img src="../../assets/icons/chats/emoji_menu.svg" alt="">
      <FormKit type="form" id="messageForm" @submit="sendMessage" :actions="false" :errors="[]">
        <FormKit type="textarea" name="message" id="message" placeholder="Message..." validation="required"
          validation-visibility="submit" :validation-messages="{
            required: 'Message is empty!'
          }" wrapper-class="chatBox" rows="1" />
      </FormKit>
      <img src="../../assets/icons/chats/camera.svg" alt="">
      <img src="../../assets/icons/chats/voice_message.svg" alt="">
    </div>
    <img src="../../assets/icons/chats/send.svg" class="sendIcon" alt="" @click="submitForm('messageForm')">
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { reset, submitForm } from '@formkit/vue';


interface MessageData {
  message: string;
}

const route = useRoute();

const currentChatId = computed(() => {
	return route.params.chatId;
});

const sendMessage = (data: any) => {
	axios.put(`/send-message/${currentChatId.value}`, {
		message: data.message
	}).then(() => {
		reset('messageForm');
	});
};
</script>

<style lang="scss">
.chatMessageInput {
  background-color: $bg-color-primary;
  display: flex;
  gap: 0.8rem;
  padding: 0.7rem 1rem 0.7rem 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;

  .chatBar {
    @include flex-center;
    background-color: $bg-color-primary;
    width: 100%;
    gap: 0.5rem;
    background-color: $bg-color-secondary;
    border-radius: 1.25rem;
    padding: 0.1rem 0.7rem;
  }

  img {
    width: 30px;
  }

  .sendIcon {
    background-color: gray;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    padding-left: 5px;
    padding: 9.5px;
  }

  #messageForm {
    position: relative;

    .formkit-messages {
      position: absolute;
      left: 25%;
      transform: translate(-50%, -50%);

      .formkit-message {
        position: absolute;
        margin: auto;
        bottom: 55px;
        color: $txt-color-primary;
        text-align: center;
        border-radius: 1.25rem;
        background-color: $bg-color-secondary;
        padding: 0.7rem;
        width: 180px;
      }
    }


    #messageForm-incomplete {
      display: none;
    }

    .formkit-inner {
      .formkit-input {
        background-color: $bg-color-secondary;
        border: none;
        padding: 0.7rem;
        margin-top: 3px;
        color: $txt-color-primary;
        font-size: 1rem;
        width: 95%;
        resize: none;
      }
    }

  }
}
</style>