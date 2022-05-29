<template>
  <SidepanelBase>
    <div id="chat" ref="chat">
      <Messages />
      <InputBar />
    </div>
  </SidepanelBase>
</template>

<script lang="ts">
import SidepanelBase from "@/components/conference/centerColumn/bars/top/SideBase.vue";
import InputBar from "@/components/conference/centerColumn/bars/top/chat/InputBar.vue";
import Messages from "@/components/conference/centerColumn/bars/top/chat/Messages.vue";

import { Vue, Component, Provide } from "vue-property-decorator";
import { ButtonToggleEvent } from "@/components/conference/types";

@Component({ components: { SidepanelBase, InputBar, Messages } })
export default class ChatPanel extends Vue {
  @Provide() path: ButtonToggleEvent = { side: "top", name: "chat" };
  @Provide() isLeft: boolean = false;
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#chat {
  width: 400px;
  @include flexbox(column);
  height: 100%;
}
</style>
