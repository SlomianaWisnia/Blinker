<template>
  <main :class="$style.errorPage">
    <div><img src="../assets/icons/error/error-cat.svg" alt="" :class="$style.errorCat"></div>
    <img src="../assets/icons/error/error-wave.svg" alt="" :class="$style.wave">
    <h1>Page not found!</h1>
  </main>
</template>

<script lang="ts">
export default {
  name: 'PageNotFound'
}
</script>

<style module lang="scss">
@use '../main.scss' as *;

.errorPage {
  background-color: $bg-color-primary;
  height: 80vh;
  text-align: center;
  color: $txt-color-primary;

  h1 {
    color: rgb(224, 251, 252)
  }

  div {
    background-color: $bg-color-primary;

  }

  .errorCat {
    margin-top: 6rem;
    width: 180px;
  }

  .wave {
    position: relative;
    top: -162px;
    border-radius: 50%;
    width: 102px;
    transform: rotate(180deg);
  }
}
</style>
