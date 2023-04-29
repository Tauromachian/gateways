import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { registerPlugins } from "@/plugins";

const app = createApp(App);

app.mount("#app");

registerPlugins(app);
