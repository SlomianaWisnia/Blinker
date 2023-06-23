<template>
  <main class="auth">
    <h2>Sign Up</h2>
    <p>Enter your credentials and get started!</p>
    <FormKit type="form" @submit="registerHandler" :actions="false" :errors="[]">
      <FormKit type="text" name="username" validation="required|length:5,50" outer-class="input" label="Username"
        :validation-messages="{
          required: 'Please enter your username.',
          length: 'Username has to be at least 5 characters long.'
        }" />
      <FormKit type="text" name="email" validation="required|email|length:5,70" outer-class="input" label="Email"
        :validation-messages="{
          required: 'Please enter your email address.',
          email: 'Please enter a valid email address.'
        }" />
      <div class="inputContainer">
        <FormKit :type="passwordIsVisible ? 'text' : 'password'" name="password" validation="required|length:8,50"
          outer-class="input" label="Password" :validation-messages="{
            required: 'Please enter your password.',
            email: 'Please enter a valid password.',
            length: 'Password has to be at least 8 characters long.'
          }
            " />
        <img src="../../assets//icons/forms/visible.svg" v-if="passwordIsVisible" @click="passwordVisibilityHandler"
          alt="">
        <img src="../../assets//icons/forms/invisible.svg" v-if="!passwordIsVisible" @click="passwordVisibilityHandler"
          alt="">
      </div>
      <FormKit :type="passwordIsVisible ? 'text' : 'password'" name="confirmedPassword"
        validation="required|confirm:password" outer-class="input" label="Confirm Password" :validation-messages="{
          required: 'Please confirm your password.',
          email: 'Please enter a valid password.',
          confirm: `Passwords don't match.`,
        }
          " />
      <FormKit type="submit" class="btn" outer-class="submit">Sign Up</FormKit>
    </FormKit>
    <p class="authMethod">Already have an account?<span @click="authMethodHandler('login')">Log In</span></p>
  </main>
</template>
<script lang="ts">
import FormKit from '@formkit/vue';
import axios from 'axios';

export default {
  name: 'SignUpForm',
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
    registerHandler(data: any) {
      console.log(data)
      axios.post('/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      }).then(() => {
        this.$router.push('/')
      }).catch(err => console.error(err))

    },
    passwordVisibilityHandler() {
      this.passwordIsVisible = !this.passwordIsVisible;
    }
  },
};
</script>
<style lang="">
  
</style>