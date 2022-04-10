<template>
  <div>
    <Feedback :feedback="feedback" />
    <div :key="c.user_id" v-for="c in feedback.comments">
      {{ c.name }}
      <br />
      <div :key="c.user_id" v-for="c in c.replies">
        {{ c }}
      </div>
    </div>
  </div>
</template>

<script>
import Feedback from "@/components/Feedback.vue";
export default {
  name: "Feedback Details",
  components: {
    Feedback,
  },
  data() {
    return {
      feedback: "",
      quiz: "asd",
    };
  },
  mounted() {
    let {id} = this.$route.params;
    this.$store.dispatch("FETCH_FEEDBACKS");
    this.$store.dispatch("FETCH_FEEDBACK", Number(id));
    this.feedback = this.$store.state.feedback;

  },
};
</script>
