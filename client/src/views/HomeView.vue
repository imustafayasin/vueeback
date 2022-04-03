<template>
  <div class="home">
    <Sidebar />
    <div class="content">
      <AddFeedBack />
    </div>
    elfida
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import AddFeedBack from "@/components/AddFeedBack.vue";

export default {
  name: "HomeView",
  components: {
    Sidebar,
    AddFeedBack,
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  gap: 30px;
}
</style>
