<template>
  <div>
    <p v-if="!props.avatar || !isImgValid" :class="$style.avatar"
      :style="{ width: sizePx, height: sizePx, fontSize: fontSizePx }">
      {{ getCapitalizedFirstLetter(props.username || loggedInUserInfo.username) }}
    </p>
    <img @error="imgErrorHandler" v-if="props.avatar && isImgValid" :src="props.avatar || loggedInUserInfo.avatar"
      alt="" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import getCapitalizedFirstLetter from '@/helpers/getCapitalizedFirstLetter';

const store = useStore();

const loggedInUserInfo = computed(() => {
	return store.state.loggedInUserData.user;
});

const isImgValid = ref(true);
const props = defineProps({
	avatar: {
		type: String,
		default: undefined,
	},
	username: {
		type: String,
		default: undefined,
	},
	size: {
		type: Number,
		default: 40
	}
});

const imgErrorHandler = () => {
	isImgValid.value = false;
};

const sizePx = computed(() => `${props.size}px`);
const fontSizePx = computed(() => `${props.size * 0.45}px`);
</script>

<style module lang="scss">
.avatar {
  @include flex-center;
  border-radius: 50%;
  background-color: grey;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  margin-right: 0.2rem;
}
</style>
