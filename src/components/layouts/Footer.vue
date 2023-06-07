<template>
  <footer>
    <router-link :to="{ path: '/' }" exact>
      <div :class="currentPath === '/' ? [$style.item, $style.active] : $style.item">
        <img src="../../assets/icons/footer/chat.svg" alt="">
        <p>Chats</p>
      </div>
    </router-link>
    <router-link :to="{ path: '/calls' }" exact>
      <div :class="currentPath === '/calls' ? [$style.item, $style.active] : $style.item">
        <img src="../../assets/icons/footer/call.svg" alt="">
        <p>Calls</p>
      </div>
    </router-link>
    <router-link :to="{ path: '/stories' }" exact>
      <div :class="currentPath === '/stories' ? [$style.item, $style.active] : $style.item">
        <img src="../../assets/icons/footer/stories.svg" alt="">
        <p>Stories</p>
      </div>
    </router-link>
  </footer>
</template>


<script lang="ts">
export default {
  name: 'Footer',
  data() {
    return {
      currentPath: this.$route.path
    }
  },
  watch: {
    $route(to) {
      this.currentPath = to.path;
    }
  }
}
</script>



<style module lang="scss">
@use '../../main.scss' as *;

footer {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $bg-color-secondary;
  width: 100%;
  bottom: 0;

  a {
    text-decoration: none;
    color: $txt-color-primary;
  }

  .item {
    @include flex-center;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.7rem;

    img {
      padding: 0.5rem;
      width: 45px;
    }

    p {
      font-size: .9rem;
    }

  }

  .active {
    img {
      background-color: #cad2c556;
      border-radius: 0.5rem;
    }
  }
}
</style>