<template>
  <button id="card" @click="buy">
    <div id="coin">
      <div class="amount">{{ value.amount }}</div>
      <div class="currency">UC</div>
    </div>
    <div id="price">
      <div class="amount">{{ value.price }}</div>
      <div class="currency">€</div>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Item as I } from "./types";
import { checkout } from "./stripe.service";

@Component
export default class Item extends Vue {
  @Prop() readonly value!: I;

  buy() {
    checkout(this.value.price);
  }
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
