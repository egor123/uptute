<template>
  <ButtonBase :title="$l('auth.btn.log_in')" @click="$emit('click')" />
</template>

<script lang="ts">
import ButtonBase from "../../global/ButtonBase.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { ButtonBase } })
export default class LogInButton extends Vue {}
</script>
