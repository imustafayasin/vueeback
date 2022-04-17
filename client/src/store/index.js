import { createStore } from 'vuex'
import feedBacks from '../assets/dummy_feedback.json'

export default createStore({
  state: {
    feedbacks: [],
    feedback: {}
  },
  getters: {
  },
  mutations: {
    SET_FEEDBACKS(state, feedbacks) {
      state.feedbacks = feedbacks
    },
    SET_FEEDBACK(state, currentFeedback) {
      state.feedback = currentFeedback
    }
  },
  actions: {
    FETCH_FEEDBACKS() {
      this.commit('SET_FEEDBACKS', feedBacks)
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
