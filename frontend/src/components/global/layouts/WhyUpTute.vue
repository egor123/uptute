<template>
  <div>
    <CheckerLayout
      inversed
      color="header"
      :title="$l('why_us.student.title')"
      :rows="[
        {
          img: 'whyUpTute/forStudent/piggy-bank',
          title: $l('why_us.student.list.0.h'),
          txt: $l('why_us.student.list.0.p'),
        },
        {
          img: 'whyUpTute/forStudent/fast',
          title: $l('why_us.student.list.1.h'),
          txt: $l('why_us.student.list.1.p'),
        },
        {
          img: 'whyUpTute/forStudent/friend',
          title: $l('why_us.student.list.2.h'),
          txt: $l('why_us.student.list.2.p'),
        },
      ]"
    />
    <CheckerLayout
      color="background"
      :title="$l('why_us.tutor.title')"
      :rows="[
        {
          img: 'whyUpTute/forTutor/goal',
          title: $l('why_us.tutor.list.0.h'),
          txt: $l('why_us.tutor.list.0.p'),
        },
        {
          img: 'whyUpTute/forTutor/money-bag',
          title: $l('why_us.tutor.list.1.h'),
          txt: $l('why_us.tutor.list.1.p'),
        },
        {
          img: 'whyUpTute/forTutor/algorithm',
          title: $l('why_us.tutor.list.2.h'),
          txt: $l('why_us.tutor.list.2.p'),
        },
        {
          img: 'whyUpTute/forTutor/time-management',
          title: $l('why_us.tutor.list.3.h'),
          txt: $l('why_us.tutor.list.3.p'),
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
