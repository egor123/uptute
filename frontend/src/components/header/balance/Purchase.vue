<template>
  <HeaderListItem
    @click="goTo('Shop')"
    icon="mdi-currency-btc"
    :text="$l('app.header.balance.purchase')"
  />
</template>

<script lang="ts">
import { goTo } from "@/plugins/utilityMethods";
import HeaderListItem from "../HeaderListItem.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { HeaderListItem }, methods: { goTo } })
export default class Purchase extends Vue {}
</script>
