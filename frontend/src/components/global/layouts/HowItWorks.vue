<template>
  <CheckerLayout
    inversed
    color="background"
    :title="$l('home.how_it_works.title')"
    :rows="[
      {
        img: 'start',
        title: $l('home.how_it_works.list.0.h'),
        txt: $l('home.how_it_works.list.0.p'),
      },
      {
        img: 'choosing',
        title: $l('home.how_it_works.list.1.h'),
        txt: $l('home.how_it_works.list.1.p'),
      },
      {
        img: 'calendar',
        title: $l('home.how_it_works.list.2.h'),
        txt: $l('home.how_it_works.list.2.p'),
      },
      {
        img: 'notebook',
        title: $l('home.how_it_works.list.3.h'),
        txt: $l('home.how_it_works.list.3.p'),
      },
      {
        img: 'rating',
        title: $l('home.how_it_works.list.4.h'),
        txt: $l('home.how_it_works.list.4.p'),
      },
    ]"
  />
</template>

<script>
import CheckerLayout from "@/components/global/layouts/CheckerLayout.vue";

export default {
  components: {
    CheckerLayout,
  },
};
</script>
