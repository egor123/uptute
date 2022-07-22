<template>
  <v-menu v-if="false" transition="slide-y-transition" top>
    <!-- Disabled !!! -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn small plain v-bind="attrs" v-on="on" elevation="0">{{
        value
      }}</v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in sizes"
        :key="index"
        v-on:click="$emit('input', item)"
      >
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: ["value", "sizes"],
};
</script>

<style lang="scss" scoped>
.v-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: transparent !important;
  border-radius: 15px;
  border-left: 1px solid darken($color: white, $amount: 16);
  border-right: 1px solid darken($color: white, $amount: 16);
  color: darken($color: white, $amount: 50) !important;

  transition: all 300ms;
  &:hover {
    background-color: darken($color: white, $amount: 10) !important;
    // color: darken($color: red, $amount: 50) !important;
  }
}

.v-list,
.v-menu__content {
  border-radius: 15px;
}
</style>
