<template>
  <div id="main">
    <div id="items">
      <Item v-for="(item, id) in items" :value="item" :key="id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Item from "@/components/shop/Item.vue";
import { Items } from "@/components/shop/classes/Items";
import { Item as I } from "@/components/shop/types";

@Component({ name: "Shop", components: { Item } })
export default class Shop extends Vue {
  items: I[] = new Items().arr;
}
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#main {
  position: relative;
  @include box-size(100%);
  #items {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @include flexbox(row);
  }
}
</style>
