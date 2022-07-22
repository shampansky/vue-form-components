import { createApp } from 'vue';
import { upperFirst, camelCase } from 'lodash';
import App from './App.vue';

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
);
const app = createApp(App);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')));
  app.component(componentName, componentConfig.default || componentConfig);
});

app.mount('#app');
