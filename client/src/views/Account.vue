<template lang="pug">
pre {{user}}
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "Account",
  data(){
      return{
          user:null
      }
  },
  mounted() {
    this.$store.dispatch("FETCH_USER").then(a => this.user = this.$store.state.user);
  },
};
</script>
