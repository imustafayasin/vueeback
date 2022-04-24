import { createStore } from 'vuex'
import feedBacks from '../assets/dummy_feedback.json'
import api from '../api/index'

export default createStore({
  state: {
    feedbacks: [],
    feedback: {},
    rgdata: null
  },
  getters: {
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
    }
  },
  actions: {
    FETCH_FEEDBACKS() {
      this.commit('SET_FEEDBACKS', feedBacks)
    },

    REGISTER() {
      return api.auth.login().then(data => {
        this.commit('COMMIT_REGISTER', data)
      })
    },

    FETCH_FEEDBACK(state, feedback_id) {
      this.dispatch("FETCH_FEEDBACKS")
      let currentFeedback = this.state.feedbacks.find(f => f.id == feedback_id);
      this.commit('SET_FEEDBACK', currentFeedback)
    }
  },
  modules: {
  }
})
