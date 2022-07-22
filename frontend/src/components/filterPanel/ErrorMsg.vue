<template>
  <div id="container">
    <div :class="{ visible: ifVisible }" ref="ErrMsg" id="errMsg">
      {{ msgUsed }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

@Component
export default class TextFieldErrorMsg extends Vue {
  @Ref() readonly ErrMsg!: HTMLDivElement;
  @Prop() readonly msg!: string;
  msgUsed: string = "";

  mounted() {
    const transitionEnd = () => {
      if (!this.ifVisible && this.msgUsed !== "") this.msgUsed = this.msg;
    };
    const transitionStart = () => {
      if (this.ifVisible && this.msgUsed === "") this.msgUsed = this.msg;
    };

    this.ErrMsg.addEventListener("transitionend", transitionEnd);
    this.ErrMsg.addEventListener("transitionstart", transitionStart);
  }

  get ifVisible() {
    const ifProp = this.msg.length > 0;
    const ifEmpty = this.msgUsed === "";
    const ifReplacing = this.msg !== this.msgUsed;

    return ifProp && (ifEmpty || !ifReplacing);
  }
}
</script>

<style lang="scss" scoped>
#container {
  height: 24px;
  position: relative;
}
#errMsg {
  z-index: 0; // To hide behind input field
  position: absolute;

  font-size: 15px;
  text-align: left;
  padding: 0 12px;
  color: var(--v-error-base);
  
  transition: 300ms all;

  &:not(.visible) {
    opacity: 0;
    top: -100%;
  }
  &.visible {
    opacity: 1;
    top: 0px;
  }
}
</style>
