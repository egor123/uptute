<template>
  <div>
    <CheckerLayout
      inversed
      :title="$l('why_us.student.title')"
      :rows="[
        {
          img: 'piggy-bank',
          title: $l('why_us.student.list.0.h'),
          txt: $l('why_us.student.list.0.p'),
        },
        {
          img: 'save-time',
          title: $l('why_us.student.list.1.h'),
          txt: $l('why_us.student.list.1.p'),
        },
        {
          img: 'fast',
          title: $l('why_us.student.list.2.h'),
          txt: $l('why_us.student.list.2.p'),
        },
        {
          img: 'friend',
          title: $l('why_us.student.list.3.h'),
          txt: $l('why_us.student.list.3.p'),
        },
        {
          img: 'laugh',
          title: $l('why_us.student.list.4.h'),
          txt: $l('why_us.student.list.4.p'),
        },
        {
          img: 'house',
          title: $l('why_us.student.list.5.h'),
          txt: $l('why_us.student.list.5.p'),
        },
      ]"
    />
    <CheckerLayout
      color="background"
      :title="$l('why_us.tutor.title')"
      :rows="[
        {
          img: 'skills',
          title: $l('why_us.tutor.list.0.h'),
          txt: $l('why_us.tutor.list.0.p'),
        },
        {
          img: 'goal',
          title: $l('why_us.tutor.list.1.h'),
          txt: $l('why_us.tutor.list.1.p'),
        },
        {
          img: 'profits',
          title: $l('why_us.tutor.list.2.h'),
          txt: $l('why_us.tutor.list.2.p'),
        },
        {
          img: 'money-bag',
          title: $l('why_us.tutor.list.3.h'),
          txt: $l('why_us.tutor.list.3.p'),
        },
        {
          img: 'time-management',
          title: $l('why_us.tutor.list.4.h'),
          txt: $l('why_us.tutor.list.4.p'),
        },
        {
          img: 'save-time',
          title: $l('why_us.tutor.list.5.h'),
          txt: $l('why_us.tutor.list.5.p'),
        },
        {
          img: 'house',
          title: $l('why_us.tutor.list.6.h'),
          txt: $l('why_us.tutor.list.6.p'),
        },
      ]"
    />
  </div>
</template>

<script>
import CheckerLayout from "@/components/global/layouts/CheckerLayout.vue";

export default {
  components: {
    CheckerLayout,
  },
};
</script>
