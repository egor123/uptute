<template>
  <v-list-item>
    <!-- TODO route Withdraw doesn't exist yet -->
    <v-btn text @click="goTo('Withdraw')">
      <v-icon>mdi-cash-multiple</v-icon>
      {{ $l("app.header.balance.withdraw") }}
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { goTo } from "@/plugins/utilityMethods";

import { Vue, Component } from "vue-property-decorator";

@Component({ methods: { goTo } })
export default class Withdraw extends Vue {}
</script>
