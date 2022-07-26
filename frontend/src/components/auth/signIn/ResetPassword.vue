<template>
  <LinkBase :title='$l("auth.forgot")' routeName="TODO" />
</template>

<script lang="ts">
import LinkBase from "@/components/auth/LinkBase.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { LinkBase } })
export default class ResetPassword extends Vue {}
</script>
