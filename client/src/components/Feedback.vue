<template lang="pug">
.feedback
    .upvote
        button
         img(src="@/assets/navigate-up-arrow.png")
         | {{feedback.vote_count}}
    .content
        h2 {{feedback.title}}
        p {{feedback.description}}
        .category {{feedback.category}}
    .comments_count
     img(src="@/assets/speech-bubble.png")
     | {{feedback.comment_count}}
</template>
<script>
export default {
  name: "Feedback",
  props: {
    feedback: Object,
  },
};
</script>
<style lang="less" scoped>
.feedback {
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.8rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 4px rgba(0,0,0,.1);
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  .upvote {
    button {
      img {
        width: 10px;
        margin: auto auto 5px auto;
      }
      display: flex;
      padding: 1rem;
      border-radius: 0.7rem;
      flex-direction: column;
      text-align: center;

      font-size: 1.1rem;
    }
  }
  .content {
    margin-left: 2.5rem;
    h2 {
      margin-bottom: 0.8rem;
      color: #393e5f;
    }
    p {
      color: #393e5fd9;
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.8;
    }
    .category {
      cursor: pointer;
      background-color: #f0f4fd;
      padding: 0.6rem 0.7rem;
      font-size: 0.8rem;
      width: min-content;
      border-radius: 15px;
      text-align: center;
      font-weight: 900;
      color: #4660e7;
      margin-top: 10px;
    }
  }
  .comments_count {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    font-weight: 900;
    img {
      width: 20px;
    }
  }
}
</style>
