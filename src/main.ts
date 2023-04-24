import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Create a Pinia instance
const pinia = createPinia();

// Provide the Pinia instance to the app
app.use(pinia);
app.use(router);
app.mount("#app");
