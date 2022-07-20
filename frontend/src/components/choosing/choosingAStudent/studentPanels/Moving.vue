<template>
  <div class="infoContainer">
    <div class="subject">
      {{ $l(`data.subjects.${subject}`) }}

      <v-spacer />

      <div class="topic">
        {{ topic }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Subject } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PanelMovingInfo extends Vue {
  @Prop(String) readonly subject!: Subject;
  @Prop(String) readonly topic!: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.infoContainer {
  @include flexbox(column);
  align-items: flex-end;
  .subject {
    @include flexbox;
    width: 100%;
    .topic {
      color: var(--v-accent-base);
    }
  }
}
</style>
