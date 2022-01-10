/*
import { createStore } from "vuex"

const axios = require("axios");

const instanceUser = axios.create({
  baseURL : "http://localhost:3000/api/user"
})

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId : -1,
    token : "",
    isadmin : ""
  };
} else {
  try {
    user = JSON.parse(user);
    instanceUser.defaults.headers.common['Authorization'] = user.token;
  } catch {
    user = {
      userId: -1,
      token: "",
      isadmin: "",
    };
  }
  
}

const store = createStore({
  state: {
    status: "",
    // user: {
    //   userId: -1,
    //   token: "",
    //   isadmin: "",
    // }
    user : user,
    userInfos: {
      firstname : "",
      lastname : "",
      email : "",
      job : ""
    }
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function(state, user) {
      instanceUser.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function(state, userInfos) {
      state.userInfos = userInfos;
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instanceUser.post("/login", userInfos)
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
        instanceUser.post("/signup", userInfos)
        .then(response => {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(error => {
          commit('setStatus', 'error_create');
          reject(error);
        })
      })
    },
    //visualiser tous les profils
    getUserInfos: ({commit}) => {
      instanceUser.get("/")
        .then(response => {
          commit('userInfos', response.data);
        
        })
        .catch(() => {
          commit('setStatus', 'error_create');
      
        })
    }
  },
    
})

export default store;
*/