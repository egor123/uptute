<template>
  <div id="container">
    <Header :title="$l('auth.header.log_in')" />
    <coming-soon />

    <v-card id="card">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          filled
          rounded
          v-model="email"
          :rules="emailRules"
          :label="$l('auth.email')"
          required
        ></v-text-field>
        <v-text-field
          filled
          rounded
          v-model="password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :label="$l('auth.password')"
          required
        >
        </v-text-field>
        <p>{{ $l("auth.forgot") }}</p>
        <v-btn
          class="mr-4 orangeBackground"
          @click="
            if ($refs.form.validate())
              signin({ name: name, password: password }).then(
                (val) => (errorMessage = val)
              );
          "
        >
          {{ $l("auth.btn.log_in") }}
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

      <v-btn id="google" @click="logIn()">
        <v-icon>mdi-google</v-icon>Sign in with Google
      </v-btn>
    </v-card>
  </div>
</template>

<script>
//import { mapActions } from "vuex";
import Header from "@/components/Header.vue";
import ComingSoon from "@/components/ComingSoon.vue";
import { GoogleAuthService } from "@/services/index";
export default {
  data() {
    return {
      valid: true,
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
      errorMessage: "",
    };
  },
  mounted() {
    // GoogleAuthService.currentUser();
    // console.log(GoogleAuthService.isSignedIn());
  },
  //methods: mapActions(["signin"]),
  methods: {
    logIn() {
      GoogleAuthService.signIn();
    },
    logOut() {
      GoogleAuthService.signOut();
    },
  },
  components: {
    Header,
    ComingSoon,
  },
};
</script>

<style scoped>
#container {
  padding-top: -56px;
  overflow: auto;
}
#card {
  height: fit-content;
  margin: 80px auto;
  padding: 30px;
  width: min(90%, 400px);
}

#google .v-icon {
  margin-right: 10px;
}
</style>
