<template>
  <v-list-item>
    <v-icon>mdi-human-male-board</v-icon>
    <span>
      {{ insertName($l("app.header.notifications.accepted.lesson")) }}
      <a target="_blank" @click="$emit('clicked')" :href="link">
        {{ $l("app.header.notifications.accepted.link") }}</a
      >
    </span>
  </v-list-item>
</template>

<script>
export default {
  props: {
    name: String,
    link: String,
  },
  methods: {
    insertName(str) {
      return str.replace("NAME", this.name);
    },
  },
};
</script>
