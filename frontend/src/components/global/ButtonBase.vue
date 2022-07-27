<template>
  <v-btn rounded outlined color="accent" @click="$emit('click')">
    {{ title }}
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ButtonBase extends Vue {
  @Prop(String) readonly title!: string;
}
</script>
