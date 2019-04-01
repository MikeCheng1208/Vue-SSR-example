import Vue from 'vue'
import VueRouter from 'vue-router';
import home from "../components/Home";
import about from "../components/About";
import contact from "../components/Contact";

Vue.use(VueRouter);

export function createRouter(){
    return new VueRouter({
        routes: [
            {path: '/',          component: home},
            {path: '/about',     component: about},
            {path: '/contact',   component: contact},
        ]
            
    })
}