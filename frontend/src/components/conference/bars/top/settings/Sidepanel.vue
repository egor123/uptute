<template>
  <SidepanelBase :isToggled="isToggled" :isLeft="true">
    <!-- <div id="info" ref="info" v-for="param in info" :key="param.id">
      <div class="key">{{ param.key }}</div>
      <v-spacer class="spacer" />
      <div class="val">{{ param.val }}</div>
    </div> -->
    <table id="info" ref="info">
      <tr v-for="param in info" :key="param.id">
        <td class="key">{{ param.key }}</td>
        <td class="val">{{ param.val }}</td>
      </tr>
    </table>
  </SidepanelBase>
</template>

<script>
import SidepanelBase from "@/components/conference/bars/top/SideBase.vue";

export default {
  data() {
    return {
      info: [
        {
          key: "Conference ID",
          val: this.room.ref?.id,
        },
      ],
    };
  },
  components: {
    SidepanelBase,
  },
  props: {
    isToggled: Boolean,
    room: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#info {
  td {
    min-width: 200px;
    max-width: 200px;
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
    // white-space: nowrap;
    word-wrap: break-word;
  }
}
</style>
