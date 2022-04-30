import { createStore } from 'vuex'
import feedBacks from '../assets/dummy_feedback.json'
import * as api from '@/api/index'

export default createStore({
  state: {
    feedbacks: [],
    feedback: {},
    userFeedbacks: [],
    rgdata: {},
    user: {},
    token: null
  },
  getters: {
    isAuth(state) {
      return !!(state.token ?? localStorage.getItem("token"))
    }
  },
  mutations: {
    SET_FEEDBACKS(state, feedbacks) {
      state.feedbacks = feedbacks
    },
    SET_FEEDBACK(state, currentFeedback) {
      state.feedback = currentFeedback
    },
    COMMIT_REGISTER(state, data) {
      state.rgdata = data
    },
    LOGIN(state, accessToken) {
      if (!accessToken) return
      state.token = accessToken
      localStorage.setItem('token', accessToken);
      api.setAuthInHeader(accessToken);
    },
    LOGOUT(state) {
      state.token = null;
      delete localStorage.token
      api.setAuthInHeader(null);
    },
    SET_AUTH_USER(state, data) {
      if (!data) return
      state.user = data
    },
    USER_FEEDBACKS(state, userfeedbacks) {
      state.userFeedbacks = userfeedbacks
    }
  },
  actions: {
    FETCH_FEEDBACKS() {
      this.commit('SET_FEEDBACKS', feedBacks)
    },

    //parametleri obje içinde gönder data{}
    REGISTER({ state }, { NAME, LASTNAME, EMAIL, PASSWORD }) {
      return api.auth.register(NAME, LASTNAME, EMAIL, PASSWORD).then(() => this.dispatch("LOGIN", { EMAIL, PASSWORD }))
    },

    LOGIN({ commit }, { EMAIL, PASSWORD }) {
      return api.auth.login(EMAIL, PASSWORD).then(({ accessToken }) => commit('LOGIN', accessToken))
    },

    LOGOUT({ commit }) {
      commit('LOGOUT')
    },

    FETCH_USER({ commit }) {
      return api.user.get().then(user => commit('SET_AUTH_USER', user));
    },

    FETCH_FEEDBACK(state, feedback_id) {
      this.dispatch("FETCH_FEEDBACKS")
      let currentFeedback = this.state.feedbacks.find(f => f.id == feedback_id);
      this.commit('SET_FEEDBACK', currentFeedback)
    },

    CREATE_FEEDBACK({ commit }, data) {
      return api.feedback.create(data)
    },

    FETCH_USER_FEEDBACKS({ commit }) {
      return api.feedback.getUserFeedbacks().then(userFeedbacks => commit('USER_FEEDBACKS', userFeedbacks))
    }


  },
  modules: {

  }
})
