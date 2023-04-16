import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import Auth from "./modules/auth";


Vue.use(Vuex)

const secureLS = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: 'vue-cart-persist'
});
const authstate = createPersistedState({
  key: 'smile-application',
  storage: {
    getItem: (key) => secureLS.get(key),
    setItem: (key, value) => secureLS.set(key, value),
    removeItem: (key) => secureLS.remove(key),
  },
});

const store = new Vuex.Store({
  modules: {
    auth: Auth,
  },
  plugins: [authstate],
});


export default store;
