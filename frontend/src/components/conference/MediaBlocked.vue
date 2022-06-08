<template>
  <v-btn @click="tryAgain()" id="tryAgain" rounded outlined color="accent">
    Try again
  </v-btn>
</template>

<script lang="ts">
import InitState from "@/store/modules/conference/initState";
import Main from "@/store/modules/conference/main";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ConferenceMediaBlocked extends Vue {
  tryAgain(): void {
    const isCaller: boolean | null = InitState.isCaller;
    const id: string | undefined = InitState.id || undefined;

    if (!isCaller) return Main.failedToJoin({ err: `isCaller is ${isCaller}` });

    Main.init({ isCaller, id });
  }
}
</script>

<style lang="scss" scoped>
#tryAgain {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
