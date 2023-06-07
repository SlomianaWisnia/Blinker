<script lang="ts">

export default {
  name: 'Navigation',
}
</script>

<template>
  <nav>
    <div :class="$style.info">
      <p>K</p>
      <h1>Blinker</h1>
    </div>
    <div :class="$style.controls">
      <img src="../../assets/icons/navigation/search.svg" alt="search icon">
      <img src="../../assets/icons/navigation/more.svg" alt="menu icon">
    </div>
    <img src="../../assets/icons/navigation/wave.svg" alt="animated wave background" :class="$style.wave">
  </nav>
</template>

<style module lang="scss">
@use '../../main.scss' as *;

nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $bg-color-primary;
  color: $txt-color-primary;
  padding: 1.5rem 2rem;
  overflow: hidden;

  .info,
  .controls {
    @include flex-center;
    z-index: 10;
    gap: 1rem;
  }

  .info {
    p {
      @include flex-center;
      font-size: 1.2rem;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      background-color: #52796F;
      box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
    }

    h1 {
      text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
    }
  }

  .controls {
    img {
      height: 40px;
      width: 40px;
      padding: 0.3rem;
      cursor: pointer;
      box-shadow: 4px 4px 15px 1px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
  }

  .wave {
    position: absolute;
    width: 100vh;
    top: -40px;
    left: 0;
    z-index: 1;
  }
}
</style>