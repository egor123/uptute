<template>
  <ButtonBase
    :title="$l('set_up.as_student')"
    @click="$emit('click')"
    id="btn"
  />
</template>

<script lang="ts">
import ButtonBase from "@/components/global/ButtonBase.vue";

import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";

@Component({ components: { ButtonBase } })
export default class AsStudent extends Vue {}
</script>

<style scoped lang="scss">
#btn {
  border-radius: 15px 0 0 15px;
  border-right: 0px;
}
</style>
