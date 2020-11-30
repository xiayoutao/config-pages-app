import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import vant, { Dialog } from 'vant';
import 'vant/lib/index.less';

const app = createApp(App);
app.config.globalProperties.$alert = Dialog.alert;
app.config.globalProperties.$confirm = Dialog.confirm;
app.use(vant);
app.use(router);
app.mount('#app');