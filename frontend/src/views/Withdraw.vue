<template>
  <div id="main">
    <div id="card">
      <div id="convert">
        <CoinInput v-model="toWithdraw" />
        <v-icon>mdi-arrow-right-thin</v-icon>
        <CurrencyOutput :value="toReceive" />
      </div>
      <Slider v-model="toWithdraw" />
      <WithdrawButton />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Balance from "@/store/modules/balance/main";
import CoinInput from "@/components/withdraw/CoinInput.vue";
import CurrencyOutput from "@/components/withdraw/CurrencyOutput.vue";
import WithdrawButton from "@/components/withdraw/Button.vue";
import Slider from "@/components/withdraw/Slider.vue";

@Component({
  components: { CoinInput, WithdrawButton, CurrencyOutput, Slider },
})
export default class Withdraw extends Vue {
  Balance = Balance;

  toWithdraw = 0;

  get toReceive() {
    return this.toWithdraw / 10;
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#main {
  @include box-size(100%);
  @include flexbox();
  #card {
    @include box-shadow();
    padding: 16px;
    border-radius: 15px;
    & > *:not(:last-child) {
      padding-bottom: 16px;
    }
    #convert {
      @include flexbox(row);
    }
  }
}
</style>
