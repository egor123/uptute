<template>
  <button
    @click="$emit('click')"
    :class="{ isElongated: isElongated }"
    :style="`--background: ${bgColor}; --h: ${h}px`"
  >
    <v-icon color="light"> mdi-{{ curIcon }} </v-icon>
  </button>
</template>

<script lang="ts">
import { Icons } from "@/components/conference/types";
import {
  Vue,
  Component,
  Watch,
  Inject,
  InjectReactive,
} from "vue-property-decorator";

@Component
export default class BtnBase extends Vue {
  public h: number = 0;
  public curIcon: string = ""; // for HTML

  @Inject({ default: "var(--v-btnOn-base)" }) readonly bgColor!: string;
  @Inject() readonly icons!: Icons;
  @Inject({ default: false }) readonly isElongated!: boolean;
  @InjectReactive() readonly isToggled!: boolean;

  mounted(): void {
    this.setCurIcon();
    this.h = this.$el.clientHeight;
  }

  setCurIcon(): void {
    const type: string = this.isToggled ? "on" : "off";
    this.curIcon = this.icons[type];
  }

  @Watch("isToggled")
  onIsToggledChange = (): void => this.setCurIcon();
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

button {
  @include box-size(fit-content);
  padding: 12px !important;
  background-color: var(--background);
  margin: 6px;
  outline: 2px solid #ffffff00;

  transition: all 300ms;

  &.isElongated {
    width: calc(var(--h) * 2);
    border-radius: calc(var(--h) / 2);
  }
  &:not(.isElongated) {
    border-radius: 50%;
  }

  &:hover:not(:focus) {
    border-radius: 15px;
    .v-icon {
      color: var(--v-accent-base) !important;
    }
  }
  .v-icon {
    color: var(--v-light-base) !important;
  }
}
</style>
