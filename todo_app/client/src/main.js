import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		apiUrl: 'http://localhost:8081/api'
	}
});

export default app;