<template>
  <div class="chatMessageInput">
    <div class="chatBar">
      <img src="../../assets/icons/chats/emoji_menu.svg" alt="">
      <FormKit type="form" @submit="" :actions="false" :errors="[]">
        <FormKit type="textarea" placeholder="Type a message..." wrapper-class="chatBox" rows="1" resize />
      </FormKit>
      <img src="../../assets/icons/chats/camera.svg" alt="">
      <img src="../../assets/icons/chats/voice_message.svg" alt="">
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'chatMessageInput',
  computed: {
    chatroomId() {
      return this.$route.params.chatId
    }
  },
  methods: {
    sendMessage() {
      console.log(this.chatroomId)
    }
  }
}
</script>
<style lang="scss">
.chatMessageInput {
  background-color: $bg-color-primary;
  padding: 0.7rem 1rem 0.7rem 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;


  .chatBar {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    background-color: $bg-color-secondary;
    border-radius: 1.25rem;
    padding: 0.1rem 0.7rem;

    img {
      width: 33px;
    }
  }

  .chatBox {

    .formkit-inner {
      .formkit-input {
        background-color: $bg-color-secondary;
        border: none;
        padding: 0.7rem;
        color: $txt-color-primary;
        font-size: 1rem;
        width: 95%;
        resize: none;
      }
    }

  }
}
</style>