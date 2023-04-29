import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { registerPlugins } from "@/plugins";

registerPlugins(app);

createApp(App).mount("#app");
