<template>
  <InfoCardBase class="price" radius="15px">
    <h3>{{ $l("choose_a.student.price") }}</h3>
    <h3>65 UC</h3>
  </InfoCardBase>
</template>

<script lang="ts">
import InfoCardBase from "@/components/choosing/infoCards/InfoCardBase.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { InfoCardBase } })
export default class ChooseAStudentInfo extends Vue {}
</script>

<style scoped lang="scss">
.price {
  color: var(--v-primary-lighten4);
  border-radius: 15px;
  * {
    display: inline;
    margin: 0;
  }
  & *:last-child {
    float: right;
  }
}
</style>
