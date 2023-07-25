<template>
  <div :class="$style.noChats">
    <p>No chats yet.</p>
    <p>Get started by messaging a friend.</p>
  </div>
</template>
<script setup lang="ts">


</script>
<style module lang="scss">
.noChats {
  color: $txt-color-primary;
  text-align: center;
  margin-top: 3rem;
}
</style>