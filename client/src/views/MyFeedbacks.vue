<template lang="pug">
pre {{feedbacks}}
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "Account",
  data() {
    return {
      feedbacks: null,
    };
  },
  mounted() {
    this.$store.dispatch("FETCH_USER_FEEDBACKS").then(() => {
      this.feedbacks = this.$store.state.userFeedbacks;
    });
  },
};
</script>
