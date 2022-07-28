<template>
  <PageViewer id="main" :imgs="value" @imgs="emit" :upload="true" />
</template>

<script lang="ts">
import PageViewer from "@/components/global/PageViewer.vue";
import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";
import { Img } from "./types";

@Component({ components: { PageViewer } })
export default class ImgInput extends FieldClass<Img[]> {}
</script>

<style scoped lang="scss">
#main {
  width: 100%;
}
</style>
