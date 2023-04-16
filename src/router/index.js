import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index";
import Home from '@/views/HomeView.vue'
import Login from '@/views/auth/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: "login", meta: { title: "Login" }, component: Login },
  { path: '/home', name: "home", meta: { title: "Home" }, component: Home },

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/Authenticated"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router
