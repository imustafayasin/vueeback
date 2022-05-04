<template>
  <div class="register">
    <form @submit.prevent="login" action="">
      <div class="icon">&plus;</div>
      <h2 class="form__title">Login</h2>
      <div class="fields">
        <div class="row">
          <div class="field">
            <label for="">Email</label>
            <input type="email" required v-model="EMAIL" />
          </div>
          <div class="field">
            <label for="">Password</label>
            <input
              required
              name="password"
              autocomplete=""
              type="password"
              v-model="PASSWORD"
            />
          </div>
        </div>
      </div>
      <div class="buttons">
        <router-link to="/register" class="cancel">Register</router-link>
        <button class="submit">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
import {mapActions} from "vuex";
export default {
  name: "Login",
  data() {
    return {
      EMAIL: "yasin@limunis.com",
      PASSWORD: "selam",
      rPath: "/create",
    };
  },
  methods: {
    ...mapActions(["LOGIN"]),
    login() {
      let {NAME, LASTNAME, EMAIL, PASSWORD} = this;
      this.LOGIN({EMAIL, PASSWORD})
        .then((a) => this.$router.push(this.rPath))
        .catch(() => {});
    },
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
};
</script>
<style lang="less" scoped>
.register {
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
      cursor: pointer;
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
