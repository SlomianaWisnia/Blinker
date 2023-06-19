<template>
  <main class="login">
    <h2>Log in</h2>
    <p>Enter your credentials and get started!</p>
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

<style lang="scss">
.login {
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
    border-bottom: 1px solid $txt-color-primary;
    background-color: $bg-color-secondary;
    caret-color: $txt-color-primary;
    color: $txt-color-primary;
    border-radius: 0.10rem;
    height: 2.2rem;
    padding-left: 1rem;
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
  color: #008c99;
  list-style: none;
}

.formkit-label {
  color: $txt-color-primary;
}

#input_0-incomplete {
  display: none;
}
</style>

