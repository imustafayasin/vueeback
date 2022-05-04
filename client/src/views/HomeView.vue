<template>
  <div class="home">
    <Sidebar v-on:filterByCategory="filterCategory" />
    <div class="content">
      <AddFeedBack
        v-on:sortByCategory="sortCategory"
        :suggestCount="feedbacks?.length"
      />
      <EmptyState :showButton="false" v-if="!feedbacks?.length" />

      <div
        v-else
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
import EmptyState from "@/components/EmptyState.vue";

export default {
  name: "HomeView",
  components: {
    Sidebar,
    AddFeedBack,
    Feedback,
    EmptyState
  },
  data() {
    return {
      feedbacks: [],
    };
  },
  methods: {
    fetchFeedbacks(sort, category) {
      let data = {
        sort: sort ?? "new",
        category: category ?? "All",
      };
      this.$store
        .dispatch("FETCH_FEEDBACKS", data)
        .then(() => (this.feedbacks = this.$store.state.feedbacks));
    },
    sortCategory(sort) {
      this.fetchFeedbacks(sort, null);
    },
    filterCategory(category) {
      this.fetchFeedbacks("asd", category);
    },
  },
  mounted() {
    this.fetchFeedbacks();
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
