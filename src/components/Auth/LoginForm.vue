<template>
  <main class="auth">
    <h2>Log in</h2>
    <p>Welcome back!</p>
    <FormKit type="form" @submit="handleLogin" :actions="false" :errors="[]">
      <FormKit type="text" name="email" autocomplete validation="required|email|length:5,50" outer-class="input"
        label="Email" :validation-messages="{
          required: 'Please enter your email address.',
          email: 'Please enter a valid email address.'
        }" />
      <div class="inputContainer">
        <FormKit :type="passwordIsVisible ? 'text' : 'password'" name="password" autocomplete
          validation="required|length:5,70" outer-class="input" label="Password" :validation-messages="{
            required: 'Please enter your password.',
            email: 'Please enter a valid password.',
            length: 'Password has to be at least 8 characters long.'
          }
            " />
        <img src="@/assets/icons/forms/visible.svg" v-if="passwordIsVisible" @click="switchPasswordVisiblity"
          alt="Icon to hide the password">
        <img src="@/assets/icons/forms/invisible.svg" v-if="!passwordIsVisible" @click="switchPasswordVisiblity"
          alt="Icon to show the password">
      </div>
      <FormKit type="submit" class="btn" outer-class="submit">Log in</FormKit>
    </FormKit>
    <p class="authMethod">No account yet? <span @click="props.switchAuthMethod('register')">Sign Up</span></p>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { FormKit } from '@formkit/vue';
import LoginData from '@/interfaces/LoginData'

const router = useRouter()

const passwordIsVisible = ref(false)
const props = defineProps({
  switchAuthMethod: { type: Function, required: true },
})

const handleLogin = ({ email, password }: LoginData) => {
  axios.post('/auth', {
    username: email,
    password
  }).then(() => {
    router.push('/')
  }).catch(err => console.error(err))
}

const switchPasswordVisiblity = () => {
  passwordIsVisible.value = !passwordIsVisible.value
}
</script>

<style lang="scss">
@import '@/assets/scss/forms.scss';
</style>

