<template>
  <HeaderListItem
    @click="goTo('Withdraw')"
    icon="mdi-cash-multiple"
    :text="$l('app.header.balance.withdraw')"
  />
</template>

<script lang="ts">
import { goTo } from "@/plugins/utilityMethods";
import HeaderListItem from "../HeaderListItem.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { HeaderListItem }, methods: { goTo } })
export default class Withdraw extends Vue {}
</script>
