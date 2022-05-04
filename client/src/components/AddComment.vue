<template lang="pug">
form.addComment(@submit.prevent="addComment")
    label Add comment
    textarea( required placeholder="Type your comment here" v-model="comment" :maxlength="character_count"  cols="30" rows="5")
    div.actions
        div.character_counter {{character_count - comment.length}} character left
        button Post comment
 
</template>

<style lang="less" scoped>
.addComment {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 6px;
  background-color: #fff;
  label {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  textarea {
    border-radius: 0.5rem;
    background-color: #f7f8fd;
    line-height: 1.5;
    font-size: 1rem;
    padding: 1rem;
    margin-top: 0.5rem;
    min-height: 50px;
    margin-bottom: 1rem;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      background-color: #ae1feb;
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
    }
  }
}
</style>
<script>
export default {
  name: "AddComment",
  data() {
    return {
      comment: "",
      character_count: 255,
    };
  },
  methods: {
    addComment() {
      if (!this.comment) return;
      this.$emit("add", this.comment);
    },
  },
};
</script>
