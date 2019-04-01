import '@babel/polyfill';
import 'es6-promise';
import 'es6-object-assign';
import './scss/global/global.scss';

import Vue from 'vue'
import store from './store';
import { createRouter } from './route';
import App from "./App.vue";
export function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        store,
        render: h=>h(App),
    });
    return { app, router };
}