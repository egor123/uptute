<template>
  <div class="container">
    <p>{{ getDate }}</p>
    <div class="bar">
      <div
        class="content"
        v-for="time in day.times"
        :key="time.index"
        :start="time.start"
        :end="time.end"
        :style="line(time.start, time.end)"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    day: Object,
  },
  methods: {
    line(start, end) {
      start = this.convertTimeToNumber(start);
      end = this.convertTimeToNumber(end);
      return {
        "--width": (end - start) / 0.24 + "%",
        "--start": start / 0.24 + "%",
      };
    },
    convertTimeToNumber(time) {
      var array = time.split(":");
      var num = parseFloat(array[0]) + parseFloat(array[1]) / 60;
      return num;
    },
  },
  computed: {
    getDate() {
      let dateArr = this.day.date.toString().split(" ");
      var date =
        dateArr[2] +
        " " +
        this.$l(`data.days.${dateArr[0].toLowerCase()}.short`);
      return date;
    },
  },
};
</script>
<style lang="scss" scoped>
$max-width: 500px;
$text-small: 0.8rem;
$transition-time: 0.3s;
$margin-top: 2px;

.container {
  display: flex;
  padding: 0;
  p {
    margin: 0;
    width: 100px;
  }
}

.bar {
  position: relative;
  width: 100%;
  height: 9px;
  margin: auto;
  border-radius: 4px;
  background: #d3d3d3;
  opacity: 0.5;
  transition: opacity $transition-time;

  &:hover {
    opacity: 1;
  }
  @media (max-width: $max-width) {
    font-size: $text-small;
    min-width: 50px;
  }
}

.content {
  position: absolute;
  background-color: var(--v-accent-base);
  transition: background-color $transition-time;
  width: var(--width);
  left: var(--start);
  height: 100%;
  border-radius: 4px;

  &:hover {
    background-color: var(--v-accent-darken1);
    .time {
      opacity: 1;
    }
    &::before,
    &::after {
      opacity: 1;
    }
  }
  &::before,
  &::after {
    position: absolute;
    pointer-events: none;
    bottom: 100%;
    opacity: 0;
    transition: opacity $transition-time;
    @media (max-width: $max-width) {
      font-size: $text-small;
    }
  }
  &::before {
    content: attr(start);
    right: 100%;
  }
  &::after {
    content: attr(end);
    left: 100%;
  }
}
</style>