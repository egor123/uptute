<template>
  <SliderLayout :title="$l('home.mission.title')" :elements="missions" />
</template>

<script lang="ts">
import SliderLayout from "@/components/global/layouts/sliderLayout/SliderLayout.vue";
import { Mission } from "@/components/global/layouts/sliderLayout/classes/Mission";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: { SliderLayout } })
export default class HomeMission extends Vue {
  missions = new Mission(this).arr;
}
</script>
