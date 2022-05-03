<template>
  <div class="home">
    <Sidebar />
    <div class="content">
      <AddFeedBack :suggestCount="feedbacks?.length" />
      <div
        class="feedback-item"
        v-for="feedback in feedbacks"
        :key="feedback._id"
      >
        <Feedback :feedback="feedback" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Home/Sidebar.vue";
import AddFeedBack from "@/components/Home/AddFeedback.vue";
import Feedback from "@/components/Feedback.vue";

export default {
  name: "HomeView",
  components: {
    Sidebar,
    AddFeedBack,
    Feedback,
  },
  data() {
    return {
      feedbacks: [],
    };
  },
  methods: {},
  mounted() {
    this.$store
      .dispatch("FETCH_FEEDBACKS")
      .then(() => (this.feedbacks = this.$store.state.feedbacks));
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  gap: 30px;
}
.feedback-item {
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
