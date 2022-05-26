<template>
  <button
    @click="$emit('click')"
    :style="`--background: ${bgColor};`"
    :color="bgColor"
  >
    <v-icon color="light"> mdi-{{ curIcon }} </v-icon>
  </button>
</template>

<script lang="ts">
import { Icons } from "@/components/conference/types";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class BtnBase extends Vue {
  curIcon: string = "";

  @Prop(Object) readonly icons!: Icons;
  @Prop({ type: String, default: "var(--v-btnOn-base)" })
  readonly bgColor!: string;
  @Prop(Boolean) readonly isToggled!: boolean;

  mounted(): void {
    this.setCurIcon();
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
  border-radius: 50%;
  background: var(--background);
  margin: 6px;

  transition: transform 300ms;
  &:hover {
    transform: scale(0.9);
  }
}
</style>
