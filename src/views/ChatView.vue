<template>
  <main :class="$style.chatPage">
    <div :class="$style.friendInfo">
      <UserAvatar :avatar="'avatar'" :usernameLetter="'T'" />
      <h2>Test</h2>
      <p>email@gmail.com</p>
    </div>
  </main>
</template>
<script lang="ts">
import UserAvatar from '../components/UserAvatar.vue';

export default {
  name: "ChatView",
  components: {
    UserAvatar
  }
}
</script>
<style module lang="scss">
.chatPage {
  background-color: $bg-color-primary;
  min-height: 100vh;
  padding: 0.8rem;
  color: $txt-color-primary;

  .friendInfo {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 0.6rem;
    margin: 8rem 0 4rem 0;
    text-align: center;

    h2 {
      font-weight: normal;
    }

    p:nth-of-type(1) {
      width: 5rem;
      height: 5rem;
      font-size: 2.5rem;
      margin: 0 auto;
    }

    p:nth-of-type(2) {
      opacity: 0.7;
    }
  }


}
</style>