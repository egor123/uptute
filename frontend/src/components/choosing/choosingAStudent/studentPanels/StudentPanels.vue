<template>
  <div>
    <HiddenButtonCard v-for="(student, id) in students" :key="id" class="card">
      <template v-slot:static>
        <Static
          :firstName="student.details.firstName"
          :lastName="student.details.lastName"
          :grade="student.details.grade"
        />
      </template>

      <template v-slot:moving>
        <Moving
          :subject="student.details.subject"
          :topic="student.details.topic"
        />
      </template>

      <template v-slot:activator>
        <DetailsButton :student="student" />
      </template>
    </HiddenButtonCard>
  </div>
</template>

<script lang="ts">
import HiddenButtonCard from "@/components/choosing/HiddenButtonCard.vue";
import DetailsButton from "@/components/choosing/choosingAStudent/DetailsButton.vue";
import Static from "./Static.vue";
import Moving from "./Moving.vue";

import { Vue, Component, Prop } from "vue-property-decorator";
import { Lesson } from "@/store/modules/lesson/tutor/types";

@Component({ components: { HiddenButtonCard, DetailsButton, Static, Moving } })
export default class component_name extends Vue {
  @Prop(Array) readonly students!: Lesson[];
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.card {
  margin: 10px 0px !important;
}
</style>
