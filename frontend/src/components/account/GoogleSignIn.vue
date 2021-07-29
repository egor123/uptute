<template>
  <div @click="logIn()">
    <slot />
  </div>
</template>

<script>
import { GoogleAuthService } from "@/services/index";

export default {
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
    },
    logOut() {
      GoogleAuthService.signOut();
    },
  },
};
</script>

//
<style lang="scss" scoped>
// div {
//   margin: auto;
// }
//
</style>
