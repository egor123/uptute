<template>
  <CheckerLayout
    color="background"
    :title="$l('why_us.tutor.title')"
    :rows="arr"
  />
</template>

<script lang="ts">
import CheckerLayout from "@/components/global/layouts/checkerLayout/CheckerLayout.vue";
import { ForTutor } from "@/components/global/layouts/checkerLayout/classes/ForTutor";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { CheckerLayout } })
export default class HomeHowItWorks extends Vue {
  arr = new ForTutor(this).arr;
}
</script>
