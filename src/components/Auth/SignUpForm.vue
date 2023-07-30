<template>
  <main class="auth">
    <h2>Sign Up</h2>
    <p>Enter your credentials and get started!</p>
    <FormKit type="form" @submit="handleRegister" :actions="false" :errors="[]">
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
        <img src="../../assets//icons/forms/visible.svg" v-if="passwordIsVisible" @click="switchPasswordVisiblity" alt="">
        <img src="../../assets//icons/forms/invisible.svg" v-if="!passwordIsVisible" @click="switchPasswordVisiblity"
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
    <p class="authMethod">Already have an account?<span @click="props.switchAuthMethod('login')">Log In</span></p>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { FormKit } from '@formkit/vue';
import RegisterData from '../../interfaces/RegisterData';

const router = useRouter()

const passwordIsVisible = ref(false)
const props = defineProps({
  switchAuthMethod: { type: Function, required: true },
})

const handleRegister = ({ username, email, password }: RegisterData) => {
  axios.post('/register', {
    username,
    email,
    password
  }).then(() => {
    router.push('/')
  }).catch(err => console.error(err))
}

const switchPasswordVisiblity = () => {
  passwordIsVisible.value = !passwordIsVisible.value
}
</script>
<style lang="">
  
</style>