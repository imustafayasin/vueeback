<template lang="pug">
.addFeedBack
  .suggestions
      img(src="@/assets/bulb.png")
      .count {{suggestCount}} Suggestion
  .sort
    span Sort by:
    select(@change="sort()" v-model="sortType")
      option(value="new") Newest
      option(value="popular") Most Popular
  router-link(to="/create",class="add")
    button &plus; Add Feedback
</template>

<script>
export default {
  name: "AddFeedBack",
  props: {
    suggestCount: Number,
  },
  data() {
    return {
      sortType: "new",
    };
  },
  methods: {
    sort() {
      console.log(this.sortType);
      if (!this.sortType) return;
      this.$emit("sortByCategory", this.sortType);
    },
  },
};
</script>

<style lang="less" scoped>
.addFeedBack {
  margin-bottom: 2rem;
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: space-between;
  padding: 1.5rem 1rem 1.5rem 2rem;
  color: #fff;
  background-color: #373e68;
  .suggestions {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 40px;
      filter: invert(1);
    }
  }
  .sort {
    span {
      opacity: 0.8;
    }
    select {
      border: 0;
      background-color: transparent;
      option {
        padding: 10px;
        background-color: #222;
      }
    }
  }
  .add {
    button {
      background-color: #ae1feb;
      padding: 1rem 2rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
    }
  }
}
</style>
