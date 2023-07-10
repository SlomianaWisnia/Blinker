<template>
  <p :class="$style.message">{{ message }}</p>
  <!-- Add dynamic background color based on user settings on a specific chat -->
</template>
<script lang="ts">
export default {
  name: "ChatMessage",
  props: {
    message: {
      type: String,
      required: true,
    }
  }
}
</script>
<style module lang="scss">
.message {
  padding: 0.4rem;
  border-radius: 10px;
  background-color: gray;
  color: white;
  max-width: 100%;
  word-wrap: break-word;
}
</style>