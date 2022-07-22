<template>
  <CheckerLayout
    inversed
    color="background"
    :title="$l('home.how_it_works.title')"
    :rows="arr"
  />
</template>

<script lang="ts">
import CheckerLayout from "@/components/global/layouts/checkerLayout/CheckerLayout.vue";
import { HowItWorks } from "@/components/global/layouts/checkerLayout/classes/HowItWorks";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { CheckerLayout } })
export default class HomeHowItWorks extends Vue {
  arr = new HowItWorks(this).arr;
}
</script>
