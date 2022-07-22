<template>
  <Base :value="value" suffix="€" readonly />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Base from "./FieldBase.vue";

@Component({ components: { Base } })
export default class CoinInput extends Vue {
  @Prop(Number) readonly value!: number;
}
</script>
