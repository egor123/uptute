<template>
  <div>
    <LessonInfo ref="UpperRef" :radius="radius.upper" :style="style.upper" />

    <InfoCardBase ref="LowerRef" :radius="radius.lower" :style="style.lower">
      <h3 class="chooseOne">{{ $l("choose_a.tutor.choose") }}</h3>
    </InfoCardBase>
  </div>
</template>

<script lang="ts">
import InfoCardBase from "@/components/choosing/infoCards/InfoCardBase.vue";
import LessonInfo from "@/components/choosing/infoCards/LessonInfo.vue";

import { Vue, Component, Ref } from "vue-property-decorator";

@Component({ components: { InfoCardBase, LessonInfo } })
export default class ChooseATutorInfo extends Vue {
  @Ref() readonly UpperRef!: Vue;
  @Ref() readonly LowerRef!: Vue;

  radius = { upper: "15px", lower: "15px" };
  style = { upper: "", lower: "" };

  resized() {
    if (this.isDesktopLayout()) {
      this.style.upper = "position: static;";
      this.style.lower = "position: static; margin-top: 0.8rem;";
      this.radius.upper = "15px 15px 5px 5px";
      this.radius.lower = "5px 5px 15px 15px";
    } else {
      this.style.upper = "position: fixed; right: 2rem; top: 8rem;";
      this.style.lower = "position: static;";
      this.radius.upper = "15px";
      this.radius.lower = "15px";
    }
  }

  isDesktopLayout() {
    const w = {
      upper: this.UpperRef.$el.clientWidth,
      lower: this.LowerRef.$el.clientWidth,
      window: window.innerWidth,
    };

    return 2 * w.upper + w.lower + 100 > w.window;
  }

  mounted() {
    addEventListener("resize", this.resized);
    this.resized();
  }
  beforeDestroy() {
    removeEventListener("resize", this.resized);
  }
}
</script>

<style lang="scss" scoped>
.chooseOne {
  font-size: 1rem;
  font-weight: normal;
  color: var(--v-primary-lighten4);
  text-align: center;
}
</style>

