<template>
  <div :class="$style.chatMessage">
    <p :class="$style.message">{{ message }}</p>
    <p :class="$style.date">{{ messageDate() }}</p>
  </div>
  <!-- Add dynamic background color based on user settings on a specific chat -->
</template>
<script lang="ts">
import getMessageDate from '../../helpers/getMessageDate';


export default {
  name: "ChatMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true
    },
  },
  methods: {
    messageDate() {
      return getMessageDate(this.date)
    }
  },
}
</script>
<style module lang="scss">
.chatMessage {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 0.4rem;
  border-radius: 10px;
  background-color: gray;
  color: white;
  max-width: 100%;
  word-wrap: break-word;

  .date {
    color: rgba(255, 255, 255, 0.425);
  }

}
</style>