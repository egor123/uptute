<template>
    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn small v-bind="attrs" v-on="on">{{ value }}</v-btn>
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

<style scoped>
.v-btn{
  position: absolute;
  right: 0;
  top:50%;
  transform: translateY(-50%);
}
</style>