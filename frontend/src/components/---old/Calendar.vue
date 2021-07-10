<template>
  <div class="calendar">
    <p>{{$l("tutor.clarification")}}</p>
    <div v-for="day in days" :key="day.id">
      <Day :day="day" />
    </div>
  </div>
</template>
<script>
import Day from "./Day";
export default {
  props: {
    days: Array,
  },
  components: { Day },
};
</script>
<style scoped>

p {
  text-align: center;
}

.calendar {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>