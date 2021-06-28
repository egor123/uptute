<template>
  <div>
    <h4>{{ $l("tutor.about") }}</h4>
    <p>
      {{ about }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    about: String,
  },
};
</script>

<style scoped lang="scss">
p{
    margin-top: 1rem;
    text-align: left;
}
</style>