<template>
  <div>
    <Subheader :title="$l('auth.header.register')" />

    <v-card id="card">
      <v-form ref="Form" lazy-validation>
        <Email />
        <Password />
        <RepeatPassword />
        <Checkbox />
      </v-form>

      <Button @click="tryRegister" />

      <ToSignIn />
    </v-card>
  </div>
</template>

<script lang="ts">
import Subheader from "@/components/app/Subheader.vue";
import Email from "@/components/auth/signUp/EmailInput.vue";
import Password from "@/components/auth/signUp/PasswordInput.vue";
import RepeatPassword from "@/components/auth/signUp/RepeatPasswordInput.vue";
import Checkbox from "@/components/auth/signUp/Checkbox.vue";
import Button from "@/components/auth/signUp/Button.vue";
import ToSignIn from "@/components/auth/signUp/ToSignIn.vue";

import Module from "@/store/modules/auth/register";

import { Vue, Component, Ref } from "vue-property-decorator";
import { VForm } from "@/types";

@Component({
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
})
export default class Register extends Vue {
  @Ref() readonly Form!: VForm;
  isValidating: boolean = false;

  mounted() {
    addEventListener("keypress", this.onKeyPress);
  }
  beforeDestroy() {
    removeEventListener("keypress", this.onKeyPress);
  }
  onKeyPress(e: KeyboardEvent): void {
    if (e.key === "Enter") this.tryRegister();
  }
  async tryRegister(): Promise<void> {
    if (!this.Form.validate() || this.isValidating) return;

    this.isValidating = true;
    const form = { email: Module.email, password: Module.password };
    await this.$store.dispatch("auth/signup", form);
    this.isValidating = false;
  }
}
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

  & > :not(:first-child) {
    margin-top: 2rem;
  }
  & > :last-child {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
