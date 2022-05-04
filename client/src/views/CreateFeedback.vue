<template>
  <div class="create-feedback">
    <div class="header">
      <router-link to="/">
        <img src="@/assets/navigate-up-arrow.png" alt="" />
        Go Back</router-link
      >
    </div>

    <form @submit.prevent="addOrUpdateFeedback(isUpdate)">
      <div v-if="!isUpdate" class="icon">&plus;</div>
      <div v-else class="icon">
        <img src="@/assets/document-editor.png" alt="" />
      </div>
      <h2 v-if="isUpdate" class="form__title">Update "{{ feedback.TITLE }}"</h2>
      <h2 v-else class="form__title">Create New FeedBack</h2>
      <div class="fields">
        <div class="field">
          <label for="">Feedback Title</label>
          <small>Add a short, descriptiove headline</small>
          <input required type="text" v-model="feedback.TITLE" />
        </div>
        <div class="field">
          <label for="">Category</label>

          <small>Choose a category for your feedback</small>
          <select required name="" id="" v-model="feedback.CATEGORY">
            <option value="" disabled selected>Select an category</option>
            <option value="UX">UX</option>
            <option value="UI">UI</option>
            <option value="LIVE">Live</option>
            <option value="ENCHANCEMENT">Enchancemet</option>
            <option value="BUG">Bug</option>
            <option value="FEATURE">Feature</option>
          </select>
        </div>
        <div class="field">
          <label for="">Feedback Detail</label>
          <small
            >Include any specific, comments on what should be improved, added,
            etc.</small
          >
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            required
            v-model="feedback.DETAIL"
          ></textarea>
        </div>
      </div>
      <div class="buttons">
        <router-link to="/" class="cancel">Go back</router-link>
        <button class="submit">
          <span v-if="isUpdate"> Update </span><span v-else> Submit </span>
          Feedback
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: "Create Feed Back",
  data() {
    return {
      isUpdate: false,
      feedback: {},
    };
  },
  methods: {
    ...mapActions(["CREATE_FEEDBACK", "UPDATE_FEEDBACK"]),
    addOrUpdateFeedback(isUpdate) {
      if (Object.values(this.feedback).every((f) => f === null)) return;
      isUpdate
        ? this.UPDATE_FEEDBACK(this.feedback).catch(() => {})
        : this.CREATE_FEEDBACK(this.feedback).catch(() => {});
    },
  },
  mounted() {
    this.isUpdate = this.$route.path.includes("update") ? true : false;
    let {id} = this.$route.params;
    if (id) {
      this.$store
        .dispatch("FETCH_FEEDBACK", id)
        .then(() => (this.feedback = this.$store.state.feedback?.data));
    }
  },
};
</script>
<style lang="less" scoped>

.create-feedback {
  max-width: 700px;
  margin: auto;
  display: block;
}
form {
  background: #fff;
  padding: 3rem 2.5rem;
  position: relative;
  .form__title {
    margin: 2rem 0;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
  }
  .icon {
    width: 65px;
    height: 65px;
    border: 1px solid;
    display: grid;
    place-items: center;
    font-size: 3rem;
    color: #fff;
    top: -32.5px;
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(90deg, #6e98f4 0%, #a142f2 35%, #dc568c 100%);
    img {
      width: 50%;
      filter: invert(1);
    }
  }
  .fields {
    .field {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 2rem;
      label {
        color: #393e5f;
        font-size: 1.2rem;
        font-weight: 700;
      }
      small {
        color: #393e5fbd;
      }
      select {
        option {
          padding: 10px;
        }
      }
      input,
      select,
      textarea {
        border-radius: 0.5rem;
        background-color: #f7f8fd;
        font-size: 1rem;
        padding: 1rem;
        margin-top: 0.5rem;
        min-height: 50px;
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    color: #fff;
    gap: 20px;
    button,
    a {
      text-decoration: none;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      background-color: #3a4373;
      font-size: 1rem;
      &.submit {
        background-color: #ad20e8;
      }
    }
  }
}
</style>
