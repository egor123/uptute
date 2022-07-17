<template>
  <PopUp
    ref="PopUp"
    :title="$l('choose_a.tutor.ended')"
    :buttons="[
      { text: $l('choose_a.tutor.anyway'), name: 'anyway' },
      { text: $l('choose_a.tutor.cancel'), name: 'cancel' },
    ]"
    backgroundColor="error"
  />
</template>

<script lang="ts">
import PopUp from "@/components/global/PopUp.vue";

import { Vue, Component, Ref } from "vue-property-decorator";

@Component({ components: { PopUp } })
export default class ChooseATutorExitSnackbar extends Vue {
  @Ref() readonly PopUp!: PopUp;

  public getInput() {
    console.warn("WARN");
    return this.PopUp.getInput();
  }
}
</script>

