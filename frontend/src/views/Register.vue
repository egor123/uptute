<template>
  <div id="container">
    <Subheader :title="$l('auth.header.register')" />

    <v-card id="card">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          filled
          rounded
          v-model="name"
          :counter="nameLength"
          :rules="nameRules"
          :label="$l('auth.name')"
          required
        ></v-text-field>

        <v-text-field
          filled
          rounded
          v-model="email"
          :rules="emailRules"
          :label="$l('auth.email')"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :label="$l('auth.create')"
          required
          :loading="password.length != 0"
        >
          <template v-slot:progress>
            <v-progress-linear
              v-if="true"
              :value="progress"
              :color="color"
              absolute
              height="7"
            ></v-progress-linear>
          </template>
        </v-text-field>

        <v-text-field
          v-model="password2"
          :rules="password2Rules"
          :type="showPassword2 ? 'text' : 'password'"
          :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword2 = !showPassword2"
          :label="$l('auth.repeat')"
          required
        >
        </v-text-field>

        <div class="checkbox">
          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || '']"
            color="red"
            required
          ></v-checkbox>
          <p>
            {{ $l("auth.privacy", { terms: "", privacy: "test" }) }}
            <router-link :to="{ name: 'PrivacyPolicy' }">{{
              $l("app.pages.privacy_policy")
            }}</router-link>
            ,
            <router-link :to="{ name: 'TermsOfUse' }"
              >{{ $l("app.pages.terms") }}
            </router-link>
          </p>
        </div>
        <v-btn
          class="mr-4"
          rounded
          outlined
          color="accent"
          @click="
            if ($refs.form.validate()) {
              signup({ name: name, email: email, password: password }).then(
                (val) => (errorMessage = val.message)
              );
            }
          "
        >
          {{ $l("auth.btn.register") }}
        </v-btn>
      </v-form>

      <br />
      <v-alert
        v-if="errorMessage != ''"
        dense
        outlined
        text
        border="left"
        type="warning"
      >
        {{ errorMessage }}
      </v-alert>
      <p class="link" @click="goTo('LogIn')">
        {{ $l("auth.account_already") }}
      </p>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Subheader from "../components/app/Subheader.vue";
import { goTo } from "@/plugins/GlobalMethods.js";

export default {
  data() {
    return {
      valid: true,
      name: "",
      nameLength: 20,
      nameMinLength: 3,
      nameRules: [
        (v) => !!v || this.$l("auth.rules.require"),
        (v) => (v || "").indexOf(" ") < 0 || this.$l("auth.no_spaces"),
        (v) =>
          (v && v.length >= this.nameMinLength) ||
          this.$l("auth.rules.name.lenght.min", {
            n: this.nameMinLength,
          }),
        (v) =>
          (v && v.length <= this.nameLength) ||
          this.$l("auth.rules.name.lenght.max", {
            n: this.nameLength,
          }),
      ],
      email: "",
      emailRules: [
        (v) => !!v || this.$l("auth.rules.email.require"),
        (v) => (v || "").indexOf(" ") < 0 || this.$l("auth.rules.no_spaces"),
        (v) => /.+@.+\..+/.test(v) || this.$l("auth.rules.email.valid"),
      ],
      password: "",
      showPassword: false,
      passwordLength: 40,
      passwordMinLength: 6,
      passwordRules: [
        (v) => !!v || this.$l("auth.rules.password.require"),
        (v) => (v || "").indexOf(" ") < 0 || this.$l("auth.rules.no_spaces"),
        (v) =>
          (v && v.length >= this.passwordMinLength) ||
          this.$l("auth.rules.password.lenght.min", {
            n: this.passwordMinLength,
          }),
        (v) =>
          (v && v.length <= this.passwordLength) ||
          this.$l("auth.rules.password.lenght.max", { n: this.passwordLength }),
      ],
      password2: "",
      showPassword2: false,
      password2Rules: [
        (v) => !!v || this.$l("auth.rules.password.require"),
        (v) =>
          (v && v == this.password) ||
          this.$l("auth.rules.password.not_matching"),
      ],
      checkbox: false,
      errorMessage: "",
    };
  },
  computed: {
    progress() {
      return (this.password.length / this.passwordLength) * 100;
    },
    color() {
      const val = this.password.length;
      if (val < this.passwordMinLength || val > this.passwordLength)
        return "error";
      if (val < this.passwordLength / 20 + this.passwordMinLength)
        return "warning";
      return "success";
    },
  },
  methods: {
    ...mapActions(["signup"]),
    goTo,
  },
  components: {
    Subheader,
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#container {
  overflow: auto;
}
#card {
  height: fit-content;
  margin: calc(106px + 3rem) auto 3rem auto;
  padding: 30px;
  width: min(90%, 400px);
  @include box-shadow;
  border-radius: 15px;

  ::v-deep {
    .v-messages__message {
      font-size: 12px !important;
    }
  }
}

.checkbox {
  display: flex;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.checkbox p {
  position: absolute;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  text-align: left;
}

p.link {
  color: var(--v-secondary-darken2);
  font-size: 87.5%;
  cursor: pointer;
  &:hover {
    color: var(--v-secondary-darken3);
  }
  margin: 1rem 0 0 0;
}
</style>

