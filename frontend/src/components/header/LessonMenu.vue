<template>
  <HeaderMenu
    color="#000"
    textColor="var(--v-background-base)"
    borderRadius="0 0 15px 15px"
    border="none"
  >
    <template v-slot:title>
      <span> {{ $l("app.header.lesson.title") }}</span>
    </template>
    <template v-slot:content>
      <v-list-item>
        <v-btn text>
          <v-icon>mdi-school</v-icon>
          {{ $l("app.header.lesson.learn") }}
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn text id="teach">
          <v-icon>mdi-teach</v-icon>
          {{ $l("app.header.lesson.teach") }}
        </v-btn>
      </v-list-item>
    </template>
  </HeaderMenu>
</template>

<script>
import HeaderMenu from "@/components/header/HeaderMenu.vue";

export default {
  components: {
    HeaderMenu,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

span {
  @include hoverOpacity();
}
#teach {
  &,
  .v-icon {
    color: var(--v-primary-lighten3) !important;
  }
}
</style>
