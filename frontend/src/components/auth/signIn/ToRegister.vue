<template>
  <LinkBase :title='$l("auth.account_yet")' routeName="Register" />
</template>

<script lang="ts">
import LinkBase from "@/components/auth/LinkBase.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { LinkBase } })
export default class ToRegister extends Vue {}
</script>
