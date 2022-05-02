<template>
  <div>
    <div class="header">
      <router-link to="/">
        <img src="@/assets/navigate-up-arrow.png" alt="" />
        Go Back</router-link
      >
      <router-link
        v-if="feedback.ownFeedback"
        :to="`/update/` + feedback.data?._id"
        class="edit"
        >Edit Feedback {{ rgdata.message }}</router-link
      >
    </div>
    <Feedback :feedback="feedback.data" />
    <div v-if="totalComment > 0" class="comments-wrapper">
      <div class="header">
        <h2 class="comment_count">{{ totalComment }} comments</h2>
      </div>
      <div class="comments">
        <div
          class="comment"
          v-for="comment in feedback.data.comments"
          v-bind:key="comment.user_id"
        >
          <div class="user_image"></div>
          <div class="content">
            <button class="reply_comment">Reply</button>
            <div class="user">
              <b>{{ comment.name }}</b>
              <p class="mute">@{{ comment.username }}</p>
            </div>
            <div class="message">
              <p>
                {{ comment.message }}
              </p>
            </div>
          </div>
          <div class="replies"></div>
        </div>
      </div>
    </div>
    <AddComment />
    <button
      @click="deleteFeedBack(feedback.data?._id)"
      v-if="feedback.ownFeedback"
      class="delete"
    >
      Delete Feedback
    </button>
  </div>
</template>
<style lang="less" scoped>
.comments-wrapper {
  background-color: #fff;
  padding: 2rem;
  .header {
    h2 {
      font-weight: 600;
      color: #393e5f;
    }
  }
  .comment {
    display: flex;
    gap: 2rem;
    &:not(:last-child) {
      margin-bottom: 3rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 4rem;
    }

    .content {
      position: relative;
      .reply_comment {
        position: absolute;
        right: 0;
        top: 20px;
        cursor: pointer;
        font-weight: bold;
        color: #4660e7;
      }
      .user {
        b {
          font-size: 1rem;
          display: inline-block;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        p {
          opacity: 0.7;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }
      }
      .message {
        p {
          color: #393e5fd9;
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.8;
        }
      }
    }
    .user_image {
      width: 50px;
      object-fit: cover;
      flex-shrink: 0;
      height: 50px;
      background-color: #ccc;
      border-radius: 50%;
    }
  }
}
.header {
  .edit {
    font-size: 1rem;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    background: #4660e7;
    color: #fff;
  }
}
button.delete {
  padding: 0px 20px;
  margin-top: 20px;
  border: 1px solid #ed2f25;
  --color: #ed2f25;
  --bg: transparent;
  background-color: var(--bg);
  color: var(--color);
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  font-weight: 400;
  border-radius: 3px;
  &:hover {
    --color: #fff;
    --bg: #ed2f25;
  }
}
</style>
<script>
import Feedback from "@/components/Feedback.vue";
import AddComment from "@/components/AddComment.vue";
import {mapState, mapActions} from "vuex";

export default {
  name: "Feedback Details",
  components: {
    Feedback,
    AddComment,
  },
  data() {
    return {
      feedback: {},
      quiz: "asd",
      rgdata: "a123",
      totalComment: 0,
    };
  },
  methods: {
    ...mapActions(["REGISTER", "DELETE_FEEDBACK"]),
    deleteFeedBack(id) {
      this.DELETE_FEEDBACK(id).then(()=> this.$router.push('/myfeedbacks'));
    },
  },
  mounted() {
    let {id} = this.$route.params;
    this.$store
      .dispatch("FETCH_FEEDBACK", id)
      .then(() => (this.feedback = this.$store.state.feedback));
  },
};
</script>
