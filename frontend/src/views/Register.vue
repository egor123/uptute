<template>
  <div>
    <Subheader :title="$l('auth.header.register')" />

    <v-card id="card">
      <v-form ref="form" v-model="valid" lazy-validation>
        <Email />

        <Password />

        <RepeatPassword />

        <Checkbox />

        <Button @click="tryRegister()" />
      </v-form>

      <ToSignIn id="toSignIn" />
    </v-card>
  </div>
</template>

<script>
import Subheader from "@/components/app/Subheader.vue";
import Email from "@/components/auth/signUp/EmailInput.vue";
import Password from "@/components/auth/signUp/PasswordInput.vue";
import RepeatPassword from "@/components/auth/signUp/RepeatPasswordInput.vue";
import Checkbox from "@/components/auth/signUp/Checkbox.vue";
import Button from "@/components/auth/signUp/Button.vue";
import ToSignIn from "@/components/auth/signUp/ToSignIn.vue";

import Module from "@/store/modules/auth/register";

export default {
  name: "Register",
  permisions: { roles: "ALL" },
  components: {
    Subheader,
    Email,
    Password,
    RepeatPassword,
    Checkbox,
    Button,
    ToSignIn,
  },
  data() {
    return {
      valid: true,
      inProcess: false,
    };
  },
  mounted() {
    addEventListener("keypress", this.keyPressed);
  },
  beforeDestroy() {
    removeEventListener("keypress", this.keyPressed);
  },
  methods: {
    keyPressed(e) {
      if (e.key === "Enter") this.tryRegister();
    },
    async tryRegister() {
      if (this.$refs.form.validate() && !this.inProcess) {
        const form = { email: Module.email, password: Module.password };
        this.inProcess = true;
        await this.$store.dispatch("auth/signup", form);
        this.inProcess = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#card {
  height: fit-content;
  margin: calc(106px + 3rem) auto 3rem auto;
  padding: 30px;
  width: min(90%, 400px);
  @include box-shadow;
  border-radius: 15px;

  ::v-deep(.v-messages__message) {
    font-size: 12px !important;
  }

  & > :last-of-type {
    margin-top: 2rem;
  }
}


</style>
