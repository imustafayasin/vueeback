<template lang="pug">
.empty-state
    img(src="@/assets/empty.png")
    h2 Uh! Empty here
    router-link.add(to="/create") Add a feedback
</template>
<script>
export default {
  name: "EmptyState",
};
</script>

<style lang="less" scoped>
.empty-state {
  text-align: center;
  margin: auto;
  max-width: 470px;
  margin-top: 10rem;
  img {
    max-width: 90px;
    opacity: 0.5;
    margin-bottom: 1rem;
  }
  h2 {
    opacity: 0.5;
    margin-bottom: 2rem;
  }
  a.add {
    padding: 0 20px;
    height: 40px;
    border: 1px solid;
    display: inline-block;
    line-height: 40px;
    background: #3f51b5;
    border-radius: 3px;
    border-radius: 5px;
    color: #fff;
  }
}
</style>
