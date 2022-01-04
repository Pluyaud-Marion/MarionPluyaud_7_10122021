import { createStore } from "vuex"

const axios = require("axios");

const instance = axios.create({
  baseURL : "http://localhost:3000/api/user"
})
const store = createStore({
  state: {
    status: "",
    user: {
      userId: -1,
      token: "",
      isadmin:""
    }
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function(state, user) {
      state.user = user;
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post("/login", userInfos)
        .then(response => {
          commit('setStatus', 'connected');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(error => {
          commit('setStatus', 'error_login');
          reject(error);
        })
      })
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post("/signup", userInfos)
        .then(response => {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(error => {
          commit('setStatus', 'error_create');
          reject(error);
        })
      })
      
    }
  },
    
})

export default store;