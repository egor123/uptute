<template>
  <SidepanelBase :isToggled="isToggled.top.settings" :isLeft="true">
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

import {
  Vue,
  Component,
  Prop,
  Watch,
  InjectReactive,
} from "vue-property-decorator";

import { IsToggled } from "@/interfaces/Conference";
interface Info {
  [index: string]: {
    name: string;
    val: string;
  };
}

@Component({
  components: { SidepanelBase },
})
export default class SettingsPanel extends Vue {
  info: Info = {
    id: {
      name: "Conference ID",
      val: "",
    },
  };

  @Prop(String) roomId!: string;

  @InjectReactive() readonly isToggled!: IsToggled;

  mounted(): void {
    this.setRomId();
  }

  setRomId(): void {
    this.info.id.val = this.roomId;
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
