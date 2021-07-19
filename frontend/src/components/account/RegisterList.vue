<template>
  <div class="div">
    <v-list-item>
      <v-btn text id="google" @click="logIn()">
        <v-icon>mdi-google</v-icon>Sign in
      </v-btn>
    </v-list-item>
  </div>
</template>

<script>
import { GoogleAuthService } from "@/services/index";

export default {
  data() {
    return {};
  },
  methods: {
    logIn() {
      GoogleAuthService.signIn()
        .then(() => {
          this.$router.push({ name: "PrimarySettingUp" });
        })
        .catch((e) => {
          if (e.error === "idpiframe_initialization_failed")
            this.$root.$emit("cookiesError");
        });

      //   new Promise((resolve, reject) => {
      //     resolve("Success!");
      //     reject("Fail!");
      //   });
    },
    logOut() {
      GoogleAuthService.signOut();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  border-radius: 15px;
}
#google {
  width: 100%;
  //   text-transform: none;
  color: var(--v-secondary-base);
  .v-icon {
    margin-right: 10px;
    color: var(--v-accent-base);
  }
}
</style>
