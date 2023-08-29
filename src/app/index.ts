import { createApp } from "vue";
import { createPinia } from "pinia";

import "./index.scss";

import App from "./index.vue";
import { router } from "./providers";

export const app = createApp(App);

app.use(createPinia());
app.use(router);
