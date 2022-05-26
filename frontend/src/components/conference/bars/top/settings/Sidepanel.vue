<template>
  <SidepanelBase :isToggled="toggleStore.isToggled.top.settings" :isLeft="true">
    <table id="info" ref="info">
      <tr v-for="(param, id) in info" :key="id">
        <td class="key">{{ param.name }}</td>
        <td class="val">{{ param.val }}</td>
      </tr>
    </table>
  </SidepanelBase>
</template>

<script lang="ts">
import SidepanelBase from "@/components/conference/bars/top/SideBase.vue";

import ToggleStore from "@/store/modules/conference/toggleStore";
import Main from "@/store/modules/conference/main";
import { Vue, Component, Watch } from "vue-property-decorator";

interface Info {
  [index: string]: {
    name: string;
    val: string | undefined;
  };
}

@Component({ components: { SidepanelBase } })
export default class SettingsPanel extends Vue {
  toggleStore = ToggleStore;

  info: Info = {
    id: {
      name: "Conference ID",
      val: "",
    },
  };

  mounted(): void {
    this.setRomId();
  }

  setRomId(): void {
    this.info.id.val = this.roomId;
  }

  get roomId() {
    return Main.room.ref ? Main.room.ref.id : undefined;
  }
  @Watch("roomId")
  onRoomIdChange = () => this.setRomId();
}
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#info {
  td {
    width: fit-content;
    text-align: left;

    &.key {
      padding-right: 12px;
    }
    &.val {
      padding-left: 12px;
    }
  }
  tr {
    padding: 12px 0;
  }

  & > * {
    word-wrap: break-word;
  }
}
</style>
