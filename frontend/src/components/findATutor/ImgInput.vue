<template>
  <PageViewer id="main" :imgs="value" @imgs="emit" :upload="true" />
</template>

<script lang="ts">
import PageViewer from "@/components/global/PageViewer.vue";

import { Vue, Component, Prop } from "vue-property-decorator";
import { Img } from "./types";

@Component({ components: { PageViewer } })
export default class ImgInput extends Vue {
  @Prop(Array) readonly value!: Img[];

  emit(imgs: Img[]) {
    this.$emit("input", imgs);
  }
}
</script>

<style scoped lang="scss">
#main {
  width: 100%;
}
</style>
