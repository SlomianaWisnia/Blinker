<template>
  <LoginForm :authMethodHandler="checkAuthMethod" v-if="authMethod === 'login'" />
  <SignUpForm :authMethodHandler="checkAuthMethod" v-if="authMethod === 'register'" />
</template>
<script lang="ts">
import LoginForm from '../components/Auth/LoginForm.vue'
import SignUpForm from '../components/Auth/SignUpForm.vue';

export default {
  name: 'AuthView',
  components: {
    LoginForm,
    SignUpForm
  },
  data() {
    return {
      authMethod: 'login' as string
    }
  },
  methods: {
    checkAuthMethod(method: string) {
      this.authMethod = method;
      console.log(method)
    }
  }
}
</script>
<style lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: $bg-color-primary;
  height: 100vh;
  padding: 1.5rem;

  h2 {
    color: white;
    font-weight: normal;
  }

  p {
    color: $txt-color-primary;
  }


}

.formkit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &>ul:last-of-type {
    display: none;
  }
}

.inputContainer {
  position: relative;

  img {
    position: absolute;
    top: 19px;
    right: 80px;
    width: 40px;
  }
}

.input {

  .formkit-input {
    border: none;
    border-bottom: 1px solid white;
    background-color: $bg-color-secondary;
    caret-color: $txt-color-primary;
    color: $txt-color-primary;
    border-radius: 0.10rem;
    height: 2.2rem;
    padding-left: 0.5rem;
    margin-bottom: 1rem;
    width: 60%;
  }
}

.submit .formkit-input {
  position: absolute;
  border-radius: 1.25rem;
  border: none;
  background-color: $bg-color-secondary;
  color: $txt-color-primary;
  padding: 1rem 2rem;
  right: 30px;
  bottom: 20px;
}

.formkit-message {
  color: #c54b12;
  list-style: none;
}

.formkit-label {
  color: white;
}

.authMethod {
  margin-top: -0.5rem;

  span {
    color: white;
    margin-left: 0.5rem;
  }

}
</style>
