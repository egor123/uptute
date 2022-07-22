<template>
  <v-slider
    :value="value"
    @input="(v) => $emit('input', v)"
    min="0"
    :max="Balance.balance"
    track-color="secondary darken-2"
    track-fill-color="accent"
    thumb-color="accent"
    thumb-size="64"
    hide-details
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Balance from "@/store/modules/balance/main";

@Component
export default class Withdraw extends Vue {
  Balance = Balance;

  @Prop(Number) readonly value!: number;
}
</script>
