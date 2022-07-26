<template>
  <div>
    <Subheader :title="$l('auth.header.log_in')" />

    <v-card id="card">
      <v-form ref="Form" lazy-validation>
        <Email />
        <Password />
      </v-form>

      <Button @click="trySignin" />

      <div id="links">
        <ResetPassword />
        <ToRegister />
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Subheader from "@/components/app/Subheader.vue";
import Email from "@/components/auth/EmailInput.vue";
import Password from "@/components/auth/PasswordInput.vue";
import Button from "@/components/auth/signIn/Button.vue";
import ResetPassword from "@/components/auth/signIn/ResetPassword.vue";
import ToRegister from "@/components/auth/signIn/ToRegister.vue";
import { goTo } from "@/utility/methods.js";

import Module from "@/store/modules/auth/credentials";

import { Vue, Component, Ref } from "vue-property-decorator";
import { VForm } from "@/types";

@Component({
  name: "LogIn",
  permisions: { roles: "ALL" },
  components: {
    Subheader,
    Email,
    Password,
    Button,
    ResetPassword,
    ToRegister,
  },
})
export default class LogIn extends Vue {
  public goTo = goTo;
  @Ref() readonly Form!: VForm;

  mounted() {
    addEventListener("keypress", this.keyPressed);
  }
  beforeDestroy() {
    removeEventListener("keypress", this.keyPressed);
  }
  keyPressed(e: KeyboardEvent) {
    if (e.key === "Enter") this.trySignin();
  }
  trySignin(): void {
    if (!this.Form.validate()) return;

    const form = { email: Module.email, password: Module.password };
    this.$store.dispatch("auth/signin", { form });
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#card {
  height: fit-content;
  padding: 30px;
  width: min(90%, 400px);
  margin: calc(106px + 3rem) auto 3rem auto;
  border-radius: 15px;
  @include box-shadow;

  #links {
    margin-top: 2rem;
    & > * {
      margin-left: auto;
      margin-right: auto;
    }
    & > :last-child {
      margin-top: 0.5rem;
    }
  }
}
</style>
