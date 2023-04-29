/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";
import loadEasyDataTable from "./easyDataTable";

export function registerPlugins(app) {
  loadEasyDataTable(app);
  app.use(vuetify).use(pinia).use(router);
}
