<template lang="pug">
 
.sidebar
  .sidebar__cart.zero
    div(v-if="!isLogin")
      router-link(to="/login") Login
      router-link(to="/register") Register
    div(v-else)
      router-link(to="/account") My Account
      router-link(to="/myfeedbacks") My Feedbacks
      a(href="/logout" @click="logout($event)") Log out
  .sidebar__cart.one
    h2 Frontend Mentor
    p Feedback Board
  .sidebar__cart.tags
    .tag All
    .tag UI
    .tag UX
    .tag Enchancemet
    .tag Bug
    .tag Feature
  .sidebar__cart.roadmap
    .head
      h3 Roadmap
      a(href='#') View
    .roadmap__items
      .item
        .status__title
          span.planned Planned
        .item__count 2
      .item
        .status__title
          span.progress In-Progress
        .item__count 3
      .item
        .status__title
          span.live Live
        .item__count 1

</template>

<script>
export default {
  name: "Sidebar",
  props: {
    msg: String,
  },
  methods: {
    logout(e) {
      e.preventDefault();
      this.$store.dispatch("LOGOUT");
      this.isLogin = false;
    },
  },
  data() {
    return {
      isLogin: this.$store.getters.isAuth,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.sidebar {
  a {
    display: block;
    margin: 15px 0;
    &:hover {
      text-decoration: underline;
    }
  }
  .sidebar__cart {
    width: 280px;
    min-height: 150px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 1rem;
    &.one {
      background: rgb(110, 152, 244);
      background: linear-gradient(
        90deg,
        rgba(110, 152, 244, 1) 0%,
        rgba(161, 66, 242, 1) 35%,
        rgba(220, 86, 140, 1) 100%
      );
      color: #fff;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }
    &.tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .tag {
        cursor: pointer;
        background-color: #f0f4fd;
        padding: 0.6rem 0.7rem;
        font-size: 0.8rem;
        min-width: 50px;
        border-radius: 15px;
        text-align: center;
        font-weight: 900;
        color: #4660e7;
        &.active {
          color: #fff;
          background-color: #4660e7;
        }
        &:hover {
          .active();
        }
      }
    }
    &.roadmap {
      .head {
        display: flex;
        justify-content: space-between;
        h3 {
          font-weight: 900;
        }
        a {
          color: #4660e7;
          font-weight: 900;
          font-size: 0.95rem;
        }
      }
      .roadmap__items {
        margin-top: 1.2rem;
        .item {
          display: flex;
          align-items: center;
          margin-bottom: 0.6rem;
          justify-content: space-between;
          .status__title {
            display: flex;
            align-items: center;
            position: relative;
          }
          span {
            margin-left: 0.6rem;
            &::before {
              content: "";
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
              position: absolute;
              left: -5px;
              top: 50%;
              --bgcolor: #000;
              background-color: var(--bgcolor);
              transform: translateY(-50%);
            }
            &.planned::before {
              --bgcolor: #f39c86;
            }
            &.progress::before {
              --bgcolor: #af18ee;
            }
            &.live::before {
              --bgcolor: #65b8f0;
            }
          }
        }
      }
    }
  }
}
</style>
