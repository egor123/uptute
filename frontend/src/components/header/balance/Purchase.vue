<template>
  <v-list-item>
    <v-btn text @click="goTo('Shop')">
      <v-icon>mdi-currency-btc</v-icon>
      {{ $l("app.header.balance.purchase") }}
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { goTo } from "@/plugins/utilityMethods";

import { Vue, Component } from "vue-property-decorator";

@Component({ methods: { goTo } })
export default class Purchase extends Vue {}
</script>
