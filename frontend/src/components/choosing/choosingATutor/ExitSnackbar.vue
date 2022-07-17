<template>
  <Snackbar
    ref="Snackbar"
    :title="$l('choose_a.tutor.ended')"
    :buttons="[
      { text: $l('choose_a.tutor.anyway'), name: 'anyway' },
      { text: $l('choose_a.tutor.cancel'), name: 'cancel' },
    ]"
    backgroundColor="error"
  />
</template>

<script lang="ts">
import Snackbar from "@/components/global/Snackbar.vue";

import { Vue, Component, Ref } from "vue-property-decorator";

@Component({ components: { Snackbar } })
export default class ChooseATutorExitSnackbar extends Vue {
  @Ref() readonly Snackbar!: Snackbar;

  public getInput() {
    console.warn("WARN");
    return this.Snackbar.getInput();
  }
}
</script>

