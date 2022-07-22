<template>
  <v-list-item>
    <v-btn
      text
      @click="$emit('click')"
      :style="`--color: ${color}; --justify: ${justify};`"
      :class="{ withText: !!text }"
    >
      <v-icon v-if="icon">{{ icon }}</v-icon>
      <img v-if="img" :src="img" :alt="alt" />
      <div v-if="text">{{ text }}</div>
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class HeaderListItem extends Vue {
  @Prop(String) readonly icon!: string;
  @Prop(String) readonly img!: string;
  @Prop({ type: String, default: "" }) readonly alt!: string;
  @Prop(String) readonly text!: string;
  @Prop({ type: String, default: "var(--v-background-base)" })
  readonly color!: string;
  @Prop({ type: String, default: "left" }) readonly justify!: string;
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.v-btn {
  width: 100%;
  border-radius: 50px;
  color: var(--color) !important;
  text-transform: none;
  background-color: transparent !important;
  justify-content: var(--justify);
  &.withText {
    img,
    .v-icon {
      margin-right: 10px;
    }
  }
  &:not(.withText) {
    padding: 6px !important;
    min-width: 0px !important;
    @include box-size(fit-content);
  }
  .v-icon {
    color: var(--color);
  }
  img {
    $iconWidth: calc(30px * 0.845);
    width: $iconWidth;
    margin: 0 calc((30px - #{$iconWidth}) / 2);
  }
}
</style>
