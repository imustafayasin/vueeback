<template lang="pug">
.user
  .name {{user?.USERNAME}}
  .name {{user?.EMAIL}}
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "Account",
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.$store
      .dispatch("FETCH_USER")
      .then((a) => (this.user = this.$store.state.user));
  },
};
</script>
