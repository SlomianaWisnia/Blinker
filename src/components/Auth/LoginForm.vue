<template>
  <main class="auth">
    <h2>Log in</h2>
    <p>Welcome back!</p>
    <FormKit type="form" @submit="loginHandler" :actions="false" :errors="[]">
      <FormKit type="text" validation="required|email|" outer-class="input" label="Email" :validation-messages="{
        required: 'Please enter your email address.',
        email: 'Please enter a valid email address.'
      }" />
      <div class="inputContainer">
        <FormKit :type="passwordIsVisible ? 'text' : 'password'" validation="required" outer-class="input"
          label="Password" :validation-messages="{
            required: 'Please enter your password.',
            email: 'Please enter a valid password.'
          }
            " />
        <img src="../../assets//icons/forms/visible.svg" v-if="passwordIsVisible" @click="passwordVisibilityHandler"
          alt="">
        <img src="../../assets//icons/forms/invisible.svg" v-if="!passwordIsVisible" @click="passwordVisibilityHandler"
          alt="">
      </div>
      <FormKit type="submit" class="btn" outer-class="submit">Log in</FormKit>
    </FormKit>
    <p class="authMethod">No account yet? <span @click="authMethodHandler('register')">Sign Up</span></p>
  </main>
</template>

<script lang="ts">
import FormKit from '@formkit/vue';

export default {
  name: 'LoginForm',
  data() {
    return {
      passwordIsVisible: false,
    }
  },
  props: {
    authMethodHandler: {
      type: Function,
      default: '',
    },
    title: {
      type: String,
    }
  },
  methods: {
    loginHandler() {
      //...
    },
    passwordVisibilityHandler() {
      this.passwordIsVisible = !this.passwordIsVisible;
    }
  },
};
</script>

<style lang="scss"></style>

