<template>
  <div class="home">
    <Sidebar />
    <div class="content">
      <AddFeedBack />
      <template v-for="feedback in feedbacks" v-bind:key="feedback.title">
        <Feedback :feedback="feedback" />
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import AddFeedBack from "@/components/AddFeedback.vue";
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
      feedbacks: [
        {
          title: "Add tags for solutions",
          description:
            "Easier to search for solutions based on a specific stack.",
          category: "Enhancement",
          comment_count: 2,
          vote_count: 122,
        },
        {
          title: "Q&A within the challenge hubs",
          description: "Challange-specific Q&A would make for easy reference",
          category: "Feature",
          comment_count: 1,
          vote_count: 65,
        },
        {
          title: "Allow image/video upload to feedback",
          description:
            "Images and screencasts can enhance comments on solutions",
          category: "Enhancement",
          comment_count: 2,
          vote_count: 51,
        },
        {
          title: "Ability to follow others",
          description:
            "Stay updated on comments and solutions other people post",
          category: "Feature",
          comment_count: 3,
          vote_count: 42,
        },
        {
          title: "Preview images not loading",
          description:
            "Challange preview images are missing when you apply a filter",
          category: "Bug",
          comment_count: 3,
          vote_count: 0,
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  gap: 30px;
}
</style>
