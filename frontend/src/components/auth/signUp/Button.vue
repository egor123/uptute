<template>
  <ButtonBase :title="$l('auth.btn.register')" @click="$emit('click')" />
</template>

<script lang="ts">
import ButtonBase from "../../global/ButtonBase.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { ButtonBase } })
export default class RegisterButton extends Vue {}
</script>
