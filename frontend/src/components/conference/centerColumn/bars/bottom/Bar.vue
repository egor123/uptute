<template>
  <BarBase :isTopBar="false">
    <div id="wrapper" ref="wrapper" :class="{ isMobile: $mb.isMobileInput() }">
      <MicOff id="mic" />
      <CamOff id="cam" />
      <ScreenShare v-if="!$mb.isMobileInput()" />
      <End id="end" />
      <!-- <Whiteboard /> -->
    </div>
  </BarBase>
</template>

<script lang="ts">
import BarBase from "@/components/conference/centerColumn/bars/BarBase.vue";

import MicOff from "@/components/conference/centerColumn/bars/bottom/buttons/MicOff.vue";
import CamOff from "@/components/conference/centerColumn/bars/bottom/buttons/CamOff.vue";
import End from "@/components/conference/centerColumn/bars/bottom/buttons/End.vue";
import ScreenShare from "@/components/conference/centerColumn/bars/bottom/buttons/ScreenShare.vue";
import Whiteboard from "@/components/conference/centerColumn/bars/bottom/buttons/Whiteboard.vue";

import LayoutHandler from "@/store/modules/conference/layoutHandler";
import { Vue, Component, Ref } from "vue-property-decorator";

@Component({
  components: { BarBase, MicOff, CamOff, End, ScreenShare, Whiteboard },
})
export default class BottomBar extends Vue {
  @Ref("wrapper") wrapperEl!: Element;

  mounted() {
    LayoutHandler.setColumnEl({ name: "center", el: this.wrapperEl });
  }
}
</script>

<style scoped lang="scss">
#wrapper {
  display: flex;
  flex-direction: row;

  &.isMobile {
    #mic {
      order: 1;
    }
    #cam {
      order: 2;
    }
    #end {
      order: 3;
    }
  }
}
</style>
