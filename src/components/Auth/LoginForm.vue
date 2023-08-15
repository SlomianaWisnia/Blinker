<template>
  <main class="auth">
    <h2>Log in</h2>
    <p>Welcome back!</p>
    <FormKit id="loginForm" type="form" @submit="handleLogin" :actions="false" :incomplete-message="false">
      <FormKit type="text" name="email" v-model="state.email" autocomplete validation="required|email|length:5,50"
        outer-class="input" label="Email" :validation-messages="{
          required: 'Please enter your email address.',
          email: 'Please enter a valid email address.'
        }" />
      <div class="inputContainer">
        <FormKit :type="state.passwordIsVisible ? 'text' : 'password'" name="password" v-model="state.password"
          autocomplete validation="required|length:8,70" outer-class="input" label="Password" :validation-messages="{
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
      <FormButton :loading="state.loading" type="login"/>
    </FormKit>
    <p class="authMethod">No account yet? <span @click="props.switchAuthMethod('register')">Sign Up</span></p>
  </main>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FormKit, setErrors, clearErrors } from '@formkit/vue';
import FormButton from '@/components/reusable/FormButton.vue';
import axios from 'axios';

const router = useRouter();

interface LoginData {
	username: string;
	password: string;
}

const state = reactive({
	passwordIsVisible: false,
	email: '',
	password: '',
	loading: false,
	error: false,
	errorMessage: '',
});

const props = defineProps({
	switchAuthMethod: { type: Function, required: true },
});

const handleLogin = async () => {
	state.loading = true;
	try {
		await axios.post('auth', {
			username: state.email,
			password: state.password
		} as LoginData);
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

watch([() => state.email, () => state.password], () => {
	clearErrors('loginForm');
});

</script>

<style lang="scss">
@import '@/assets/scss/forms.scss';
</style>

