<template>
  <div class="home">
    <Sidebar />
    <div class="content">
      <AddFeedBack />

      <template v-for="feedback in feedbacks" v-bind:key="feedback.title">
        <Feedback @click="feedbackDetail(feedback.id)" :feedback="feedback" />
      </template>
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
  methods: {
    feedbackDetail(id) {
      this.$router.push({path: `/detail/${Number(id)}`});
    },
  },
  mounted() {
    this.$store.dispatch("FETCH_FEEDBACKS");
    this.feedbacks = this.$store.state.feedbacks;
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  gap: 30px;
}
</style>
