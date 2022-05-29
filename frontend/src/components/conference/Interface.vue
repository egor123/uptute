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

import { Vue, Component, ProvideReactive } from "vue-property-decorator";

@Component({ components: { Settings, CentralColumn, Chat } })
export default class Interface extends Vue {
  @ProvideReactive() readonly margin: number = 12;
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#interface {
  height: 100vh;
  width: 100vw;
  @include flexbox(row);
  background: var(--v-background-base);
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
