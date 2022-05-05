<template>
  <div class="register">
    <form @submit.prevent="register">
      <div class="icon">&plus;</div>
      <h2 class="form__title">Register</h2>
      <div class="fields">
        <div class="row">
          <div class="field">
            <label for="">First Name</label>
            <input required type="text" v-model="NAME" />
          </div>
          <div class="field">
            <label for="">Last Name </label>
            <input required type="text" v-model="LASTNAME" />
          </div>
        </div>
        <div class="field">
          <label for="">Email</label>
          <input
            required
            type="email"
            autocomplete="username"
            v-model="EMAIL"
          />
        </div>
        <div class="field">
          <label for="">Password</label>
          <input
            required
            type="password"
            autocomplete="current-password"
            v-model="PASSWORD"
          />
        </div>
      </div>
      <div class="buttons">
        <router-link to="/" class="cancel">Go back</router-link>
        <button class="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
import {mapActions} from "vuex";
export default {
  name: "Register",
  data() {
    return {
      NAME: "",
      LASTNAME: "",
      EMAIL: "",
      PASSWORD: "",
    };
  },
  methods: {
    ...mapActions(["REGISTER"]),
    register() {
      let {NAME, LASTNAME, EMAIL, PASSWORD} = this;

      this.REGISTER({NAME, LASTNAME, EMAIL, PASSWORD})
        .then(() => this.$router.push("/"))
        .catch((error) => {});
    },
  },
};
</script>
<style lang="less" scoped>
.register {
  max-width: 700px;
  margin: auto;
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
