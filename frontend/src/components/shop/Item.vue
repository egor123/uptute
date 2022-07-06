<template>
  <button id="card" @click="checkout(value.price)">
    Price id: {{ value.price }}
    <div id="coin">
      <div class="amount">HARDCODED_AMOUNT</div>
      <div class="currency">UC</div>
    </div>
    <div id="price">
      <div class="amount">HARDCODED_PRICE</div>
      <div class="currency">€</div>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Item as I } from "./types";
import { checkout } from "./stripe.service";

@Component({ methods: { checkout } })
export default class Item extends Vue {
  @Prop() readonly value!: I;
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#card {
  padding: 16px;
  margin: 16px;
  border-radius: 15px;
  @include box-shadow();
  transition: transform 300ms, box-shadow 300ms;

  &:hover {
    transform: translateY(-4px);
  }

  & > * {
    padding: 8px;
    @include flexbox(row);
    font-weight: bold;
    align-items: end;

    .currency,
    &#price .amount {
      color: var(--v-secondary-darken3);
    }
    &#coin {
      .currency {
        color: var(--v-accent-base);
      }
      .amount {
        color: var(--v-accent-base);
        font-size: 2rem;
      }
    }
  }
}
</style>
