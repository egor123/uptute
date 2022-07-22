<template>
  <Base
    :value="value"
    @input="(v) => $emit('input', v)"
    autofocus
    suffix="UC"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Base from "./FieldBase.vue";

@Component({ components: { Base } })
export default class CoinInput extends Vue {
  @Prop(Number) readonly value!: number;
}
</script>
