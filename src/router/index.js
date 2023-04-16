import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index";

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: "login", meta: { title: "Login" }, component: () => import('@/views/auth/Login.vue') },
  { path: '/home', name: "home", meta: { title: "Home" }, component: () => import('@/views/HomeView.vue') },
  { path: '/customer', name: "customer", meta: { title: "Customer" }, component: () => import('@/views/customer/Index.vue') },
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
