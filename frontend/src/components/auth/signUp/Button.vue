<template>
  <v-btn  rounded outlined color="accent" @click="$emit('click')">
    {{ $l("auth.btn.register") }}
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class RegisterButton extends Vue {}
</script>
