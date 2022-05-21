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
      info: {
        id: {
          key: "Conference ID",
          val: "",
        },
      },
    };
  },
  computed: {},
  components: {
    SidepanelBase,
  },
  props: {
    isToggled: Boolean,
    roomId: String,
  },
  watch: {
    roomId(v) {
      this.info.id.val = v;
    },
  },
  // mounted() {
  // },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#info {
  td {
    // min-width: 0px;
    width: fit-content;
    // max-width: 400px;
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
