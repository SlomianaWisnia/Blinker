import { reactive, toRefs } from 'vue';
import axios from 'axios';

interface FetchedData {
	isLoading: boolean;
	hasError: boolean;
	errorMessage: string;
	data: any;
}

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';

export const useFetch = async (url: string, type: string) => {
	const state = reactive<FetchedData>({
		isLoading: true,
		hasError: false,
		errorMessage: '',
		data: null,
	});

	const fetchData = async () => {
		state.isLoading = true;

		try {
			const response = await axios[type as Methods](url);
			state.data = response.data;
		} catch (error: unknown) {
			const typedError = error as Error;
			state.hasError = true;
			state.errorMessage = typedError.message;
		} finally {
			state.isLoading = false;
		}
	};

	await fetchData();

	return {
		...toRefs(state),
	};
};
