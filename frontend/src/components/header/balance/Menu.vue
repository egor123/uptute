<template>
  <HeaderMenu
    justifyContent="flex-end"
    paddingTop="10px"
    transformOrigin="right top"
    :onHover="false"
  >
    <template v-slot:title>
      <div id="sum">{{ Balance.balance }}UC</div>
    </template>

    <template v-slot:content>
      <Purchase />
      <Withdraw />
    </template>
  </HeaderMenu>
</template>

<script lang="ts">
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import Purchase from "./Purchase.vue";
import Withdraw from "./Withdraw.vue";

import Balance from "@/store/modules/balance/main";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { HeaderMenu, Purchase, Withdraw } })
export default class BalanceMenu extends Vue {
  Balance = Balance;
}
</script>

<style lang="scss" scoped>
#sum {
  color: var(--v-secondary-darken2);
  transition: color 500ms;
  &:hover {
    cursor: pointer;
    color: var(--v-accent-base);
  }
}
</style>
