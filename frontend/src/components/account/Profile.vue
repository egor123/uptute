<template>
  <Background>
    <div id="gridCard">
      <div class="boxShadowCard" id="lvlCard">
        <div>
          <v-progress-circular
            rotate="270"
            :size="250"
            :width="10"
            :value="lvlPercent"
            color="accent"
          >
            <p id="lvl">lv 3</p>
            <p id="percent">{{ Math.round(lvlPercent * 10) / 10 }}%</p>
          </v-progress-circular>
        </div>
        <div id="lvlInfo">
          <p>
            Lessons: <span> {{ info.lessons }}</span>
          </p>
          <p>
            Hours: <span> {{ Math.round(info.hours * 10) / 10 }}</span>
          </p>
          <p>
            Streak: <span> {{ info.streak }}</span>
            <!-- weeks -->
          </p>
        </div>
      </div>
      <div class="cardsRow">
        <div class="boxShadowCard" id="monetaryCard">
          <p>
            Price: <span> {{ Math.round(info.price) }}</span>
          </p>
          <p>
            Current: <span> {{ info.current_balance }}</span>
          </p>
          <p>
            Total: <span>{{ info.totally_earned }}</span>
          </p>
        </div>
        <div class="boxShadowCard" id="leagueCard">
          <p>
            League: <span> {{ info.league }}</span>
          </p>
          <p>
            Rating: <span> #{{ info.rating }}</span>
          </p>
          <p>
            Top <span> {{ Math.round(info.top * 10) / 10 }}%</span>
          </p>
        </div>
      </div>
    </div>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";

export default {
  components: {
    Background,
  },
  data() {
    return {
      lvlPercent: 36.8123,
      info: {
        lessons: 12,
        hours: 9.645,
        streak: 7,
        price: 57.942,
        current_balance: 287,
        totally_earned: 534,
        league: 2,
        rating: 37,
        top: 15.672,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
$cardPadding: 2rem;
$cardMargin: 1rem;

#gridCard {
  width: max-content;
  p {
    color: var(--v-background-darken3);
  }
  .cardsRow {
    @include flexbox();
    & > * {
      width: 100%;
      &:first-child {
        margin-right: $cardMargin !important;
      }
    }
  }

  .boxShadowCard {
    @include box-shadow();
    padding: $cardPadding;
    border-radius: 15px;
    margin-bottom: $cardMargin;
    @include flexbox();
    p {
      width: 100%;
      text-align: left;
      span {
        float: right;
        margin-left: 1ch;
      }
    }
  }

  #lvlCard {
    ::v-deep {
      .v-progress-circular__info {
        @include flexbox(column);

        p {
          text-align: center;
          margin-bottom: 0;
        }
      }
    }
    #lvlInfo {
      text-align: left;
      margin-left: 1.5rem;
    }
  }

  .boxShadowCard:not(#lvlCard) {
    flex-direction: column;
  }
}
</style>
