<template>
  <CheckerLayout
    inversed
    color="header"
    :title="$l('why_us.student.title')"
    :rows="arr"
  />
</template>

<script lang="ts">
import CheckerLayout from "@/components/global/layouts/checkerLayout/CheckerLayout.vue";
import { ForStudent } from "@/components/global/layouts/checkerLayout/classes/ForStudent";

import { Vue, Component } from "vue-property-decorator";

@Component({ components: { CheckerLayout } })
export default class HomeHowItWorks extends Vue {
  arr = new ForStudent(this).arr;
}
</script>
