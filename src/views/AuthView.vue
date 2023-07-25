<template>
  <LoginForm :switch-auth-method="switchAuthMethod" v-if="authMethod === 'login'" />
  <SignUpForm :switch-auth-method="switchAuthMethod" v-if="authMethod === 'register'" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '@/components/Auth/LoginForm.vue'
import SignUpForm from '@/components/Auth/SignUpForm.vue';

const authMethod = ref('login')

const switchAuthMethod = (method: string) => {
  authMethod.value = method
}
</script>

<style lang="scss"></style>
