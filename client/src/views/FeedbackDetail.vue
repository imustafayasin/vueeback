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
    <div v-if="!!feedback?.comments?.length" class="comments-wrapper">
      <div class="header">
        <h2 class="comment_count">{{ feedback?.comments?.length }} comments</h2>
      </div>
      <div class="comments">
        <div
          class="comment"
          v-for="data in feedback?.comments"
          v-bind:key="data.USERID._id"
        >
          <div class="user_image"></div>
          <div class="content">
            <button class="reply_comment">Reply</button>
            <button
              v-if="feedback.currentUserId == data.USERID._id"
              @click="deleteComment(data._id)"
              class="remove_comment"
            >
              Remove
            </button>
            <div class="user">
              <b>{{ data.USERID.NAME + " " + data.USERID.LASTNAME }}</b>
              <p class="mute">@{{ data.USERID.USERNAME }}</p>
            </div>
            <div class="message">
              <p>
                {{ data.COMMENT }}
              </p>
            </div>
          </div>
          <div class="replies"></div>
        </div>
      </div>
    </div>
    <AddComment v-on:add="addComment" />
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
    position: relative;
    &:not(:last-child) {
      margin-bottom: 3rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 4rem;
    }

    .content {
      width: fit-content;
      .user,
      .message {
        width: fit-content;
      }
      button {
        position: absolute;
        cursor: pointer;
        font-weight: bold;
        right: 0;
        color: var(--color);
        top: var(--top);
        &:hover {
          text-decoration: underline;
        }
      }
      .reply_comment {
        --color: #4660e7;
        --top: 0;
      }
      .remove_comment {
        --color: #ed2f25;
        --top: 40px;
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
    ...mapActions(["DELETE_FEEDBACK", "ADD_COMMENT", "DELETE_COMMENT"]),
    deleteFeedBack(id) {
      this.DELETE_FEEDBACK(id).then(() => this.$router.go(-1));
    },
    addComment(commentText) {
      let commentObject = {
        FEEDBACK_ID: this.feedback.data?._id,
        COMMENT: commentText,
      };
      this.ADD_COMMENT(commentObject).then((data) => this.fetchFeedback());
    },
    fetchFeedback() {
      let {id} = this.$route.params;
      this.$store
        .dispatch("FETCH_FEEDBACK", id)
        .then(() => (this.feedback = this.$store.state.feedback));
    },
    deleteComment(id) {
      this.DELETE_COMMENT(id).then((data) => this.fetchFeedback());
    },
  },
  mounted() {
    this.fetchFeedback();
  },
};
</script>
