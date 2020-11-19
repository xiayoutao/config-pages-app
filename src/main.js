import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import vant, { Dialog } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
app.$alert = Dialog.alert;
app.$confirm = Dialog.confirm;

app.use(vant);
app.use(router);

app.mount('#app');