<template>
  <div id="interface">
    <Settings />
    <CentralColumn />
    <Chat />
  </div>
</template>

<script lang="ts">
import Settings from "@/components/conference/centerColumn/bars/top/settings/Sidepanel.vue";
import CentralColumn from "@/components/conference/centerColumn/CenterColumn.vue";
import Chat from "@/components/conference/centerColumn/bars/top/chat/Sidepanel.vue";
import Swipe from "@/components/conference/plugins/Swipe.vue";
import OnRotate from "@/components/conference/plugins/OnRotate.vue";

import { Component, Provide } from "vue-property-decorator";
import { mixins } from "vue-class-component";

@Component({ components: { Settings, CentralColumn, Chat } })
export default class Interface extends mixins(Swipe, OnRotate) {
  @Provide() readonly margin: number = 12; //px
  @Provide() readonly transitionTime: number = 700; //ms
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#interface {
  position: relative;
  height: 100%;
  width: 100%;
  @include flexbox(row);
  overflow: hidden;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff00;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--v-light-darken3);
    border-radius: 15px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--v-light-darken4);
  }
}
</style>
