<template>
  <LinkBase :title="$l('auth.account_already')" routeName="LogIn" />
</template>

<script lang="ts">
import LinkBase from "../LinkBase.vue";
import { goTo } from "@/utility/methods.js";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { LinkBase } })
export default class ToSignIn extends Vue {
  goTo = goTo;
}
</script>
