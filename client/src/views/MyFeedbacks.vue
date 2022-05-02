<template lang="pug">
div.header
  router-link(to="/")
    img(src="@/assets/navigate-up-arrow.png")
    |Go Back
<EmptyState v-if="!feedbacks.length" />
template(v-for="feedback in feedbacks" v-else)
  Feedback(:feedback="feedback")
</template>

<script>
import {mapActions} from "vuex";
import EmptyState from "@/components/EmptyState";
import Feedback from "@/components/Feedback";
export default {
  name: "Account",
  components: {
    Feedback,
    EmptyState,
  },
  data() {
    return {
      feedbacks: [],
    };
  },
  mounted() {
    this.$store.dispatch("FETCH_USER_FEEDBACKS").then(() => {
      this.feedbacks = this.$store.state.userFeedbacks.data;
    });
  },
};
</script>
