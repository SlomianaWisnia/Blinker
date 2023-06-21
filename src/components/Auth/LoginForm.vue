<template>
  <main class="auth">
    <h2>Log in</h2>
    <p>Welcome back!</p>
    <FormKit type="form" @submit="loginHandler" :actions="false" :errors="[]">
      <FormKit type="text" name="email" validation="required|email|length:5,50" outer-class="input" label="Email"
        :validation-messages="{
          required: 'Please enter your email address.',
          email: 'Please enter a valid email address.'
        }" />
      <div class="inputContainer">
        <FormKit :type="passwordIsVisible ? 'text' : 'password'" name="password" validation="required|length:5,70"
          outer-class="input" label="Password" :validation-messages="{
            required: 'Please enter your password.',
            email: 'Please enter a valid password.',
            length: 'Password has to be at least 8 characters long.'
          }
            " />
        <img src="../../assets/icons/forms/visible.svg" v-if="passwordIsVisible" @click="passwordVisibilityHandler"
          alt="">
        <img src="../../assets/icons/forms/invisible.svg" v-if="!passwordIsVisible" @click="passwordVisibilityHandler"
          alt="">
      </div>
      <FormKit type="submit" class="btn" outer-class="submit">Log in</FormKit>
    </FormKit>
    <p class="authMethod">No account yet? <span @click="authMethodHandler('register')">Sign Up</span></p>
  </main>
</template>

<script lang="ts">
import FormKit from '@formkit/vue';
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      passwordIsVisible: false,
      dummy: null,
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
    loginHandler(data: any) {
      axios.post('/auth', {
        username: data.email,
        password: data.password
      }).then(() => {
        //
        this.$router.push('/')
      })
    },
    passwordVisibilityHandler() {
      this.passwordIsVisible = !this.passwordIsVisible;
    },
  },
};
</script>

<style lang="scss"></style>

