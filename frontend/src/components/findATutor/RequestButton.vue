<template>
  <v-btn @click="$emit('click')" rounded outlined color="accent">
    {{ $l("find.request") }}
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class RequestButton extends Vue {}
</script>