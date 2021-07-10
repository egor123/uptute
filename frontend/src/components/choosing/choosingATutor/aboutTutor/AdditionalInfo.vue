<template>
  <div>
    <v-row class="ma-0">
      <v-col class="col-12 col-sm-6">
        <h4>{{ $l("tutor.subjects") }}</h4>
        <p v-for="txt in subjects" :key="txt">
          {{ $l("data.subjects." + txt) }}
        </p>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <h4>{{ $l("tutor.languages") }}</h4>
        <p v-for="txt in languages" :key="txt">
          {{ $l("data.languages." + txt) }}
        </p>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <h4>{{ $l("tutor.audience") }}</h4>
        <p>{{ `${$l("tutor.grades")} ${audience.from} - ${audience.to}` }}</p>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <h4>{{ $l("tutor.age") }}</h4>
        <p>{{ age }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    subjects: Array,
    languages: Array,
    audience: Object,
    age: Number,
  },
};
</script>

<style scoped lang="scss">
h4 {
  margin-bottom: 1rem;
}
p {
  margin-bottom: 0.5rem;
}
</style>
