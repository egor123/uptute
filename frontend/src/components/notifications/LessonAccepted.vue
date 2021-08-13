<template>
  <v-list-item>
    <v-icon>mdi-teach</v-icon>
    <span>
      A lesson with {{ name }}
      <a target="_blank" :href="link">here</a>
    </span>
  </v-list-item>
</template>

<script>
export default {
  props: {
    name: String,
    link: String,
  },
};
</script>
