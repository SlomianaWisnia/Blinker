<template>
  <main class="auth">
    <h2>Sign Up</h2>
    <p>Enter your credentials and get started!</p>
    <FormKit type="form" id="registerForm" @submit="handleRegister" :actions="false" :incomplete-message="false">
      <FormKit type="text" name="username" validation="required|length:5,50" v-model="state.username" outer-class="input"
        label="Username" :validation-messages="{
          required: 'Please enter your username.',
          length: 'Username has to be at least 5 characters long.'
        }" />
      <FormKit type="text" name="email" validation="required|email|length:5,70" v-model="state.email" outer-class="input"
        label="Email" :validation-messages="{
          required: 'Please enter your email address.',
          email: 'Please enter a valid email address.'
        }" />
      <div class="inputContainer">
        <FormKit :type="state.passwordIsVisible ? 'text' : 'password'" name="password" autocomplete
          validation="required|length:8,50" v-model="state.password" outer-class="input" label="Password"
          :validation-messages="{
            required: 'Please enter your password.',
            email: 'Please enter a valid password.',
            length: 'Password has to be at least 8 characters long.'
          }
            " />
        <img src="@/assets/icons/forms/visible.svg" v-if="state.passwordIsVisible" @click="switchPasswordVisiblity"
          alt="Icon to hide the password">
        <img src="@/assets/icons/forms/invisible.svg" v-if="!state.passwordIsVisible" @click="switchPasswordVisiblity"
          alt="Icon to show the password">
      </div>
      <FormKit :type="state.passwordIsVisible ? 'text' : 'password'" autocomplete name="confirmedPassword"
        validation="required|confirm:password" v-model="state.confirmedPassword" outer-class="input"
        label="Confirm Password" :validation-messages="{
          required: 'Please confirm your password.',
          email: 'Please enter a valid password.',
          confirm: `Passwords don't match.`,
        }
          " />
      <FormButton :loading="state.loading" type="register" />
    </FormKit>
    <p class="authMethod">Already have an account?<span @click="props.switchAuthMethod('login')">Log In</span></p>
  </main>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FormKit, setErrors, clearErrors } from '@formkit/vue';
import FormButton from '@/components/reusable/FormButton.vue';
import axios from 'axios';

const router = useRouter();

interface RegisterData {
  username: string;
  email: string;
  password: string;
}


const state = reactive({
	passwordIsVisible: false,
	username: '',
	email: '',
	password: '',
	confirmedPassword: '',
	loading: false,
	error: false,
	errorMessage: '',
});

const props = defineProps({
	switchAuthMethod: { type: Function, required: true },
});

const handleRegister = async () => {
	state.loading = true;
	try {
		await axios.post('/register', {
			username: state.username,
			email: state.email,
			password: state.password
		} as RegisterData);
		router.push('/');

	} catch (error: any) {
		state.error = true;
		if (error.response.status === '400') {
			setErrors('loginForm', ['Wrong login and/or password!']);
		} else if (error.response.status === '500') {
			setErrors('loginForm', ['Internal server error.']);
		}

	} finally {
		state.loading = false;
	}
};

const switchPasswordVisiblity = () => {
	state.passwordIsVisible = !state.passwordIsVisible;
};

watch([() => state.email, () => state.password, () => state.username, () => state.confirmedPassword], () => {
	clearErrors('registerForm');
});
</script>
<style lang="scss">
@import '@/assets/scss/forms.scss';
</style>