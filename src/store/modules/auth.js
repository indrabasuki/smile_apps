//state
const getDefaultState = () => {
      return {
            access_token: null,
            token_type: null,
            user: null
      }
}
const state = getDefaultState();

//mutations
const mutations = {
      setToken: (state, token) => {
            state.access_token = token.token;
            state.token_type = 'Bearer';
      },
      setUser: (state, user) => {
            state.user = user;
      },
      resetState(state) {
            Object.assign(state, getDefaultState())
      }
}
const getters = {
      Authenticated: state => {
            return state.access_token != null && state.user != null;
      },
      AccessToken: state => {
            return state.token;
      },
      Token: state => {
            return state.token_type + ' ' + state.token;
      },
      User: state => {
            return state.user;
      },



}
const actions = {
      afterLoginSuccess({ commit }, data) {
            commit('setToken', data.token);
            commit('setUser', data.user);
      },
      logout({ commit }) {
            commit('resetState');
      }
}
export default {
      namespaced: true,
      state,
      mutations,
      getters,
      actions
}