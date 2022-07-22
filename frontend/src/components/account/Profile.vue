<template>
  <Background>
    <div id="gridCard">
      <div class="boxShadowCard" id="lvlCard">
        <div>
          <v-progress-circular
            rotate="270"
            :size="250"
            :width="10"
            :value="getLvPercent('glory')"
          >
            <p id="lvl">{{ getLvName("glory") }}</p>
            <p id="percent">{{ getLvPercent("glory") }}%</p>
          </v-progress-circular>
        </div>
        <div id="lvlInfo">
          <p>
            Lessons <span> {{ info.lessons }}</span>
          </p>
          <p>
            Hours <span> {{ Math.round(info.hours * 10) / 10 }}</span>
          </p>

          <p>
            Streak <span> {{ info.streak }}</span>
          </p>
        </div>
      </div>
      <div id="columnsWrapper">
        <div class="cardColumn">
          <!-- <div class="boxShadowCard" id="charismaCard">
            <v-progress-linear
              ref="charismaProgress"
              :value="getLvPercent('charisma')"
              height="5"
            >
            </v-progress-linear>
            <div id="charismaInfo">
              <p>
                {{ getLvName("charisma") }}
                <span>{{ getLvPercent("charisma") }}%</span>
              </p>
              <p>
                Upvotes <span>{{ info.upvotes }}</span>
              </p>
              <p>
                Invited <span>{{ info.invited }}</span>
              </p>
            </div>
          </div> -->
          <div class="boxShadowCard" id="monetaryCard">
            <p>
              Price <span> {{ Math.round(info.price) }}</span>
            </p>
            <p>
              Current <span> {{ info.current_balance }}</span>
            </p>
            <p>
              Total <span>{{ info.totally_earned }}</span>
            </p>
          </div>
        </div>
        <div class="cardColumn">
          <div class="boxShadowCard" id="feedback">
            <p>
              Comments <span>{{ info.comments.length }}</span>
            </p>
            <p>
              Rating <span>{{ Math.round(info.rating * 10) / 10 }}</span>
            </p>
          </div>
          <!-- <div class="boxShadowCard" id="leagueCard">
            <p id="leagueColor" ref="leagueColor">League <span /></p>
            <p>
              Position <span> #{{ info.position }}</span>
            </p>
            <p>
              Top <span> {{ Math.round(info.top * 10) / 10 }}%</span>
            </p>
          </div> -->
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
      lvConstants: {
        glory: 200,
        charisma: 50,
      },
      info: {
        exp: {
          glory: 2670,
          charisma: 1203,
        },
        lessons: 12,
        hours: 9.645,
        streak: 7,
        upvotes: 12,
        invited: 2,
        comments: [{}, {}, {}],
        rating: 4.256,
        price: 57.942,
        current_balance: 287,
        totally_earned: 534,
        league: 3,
        position: 37,
        top: 15.672,
      },
      levelNames: {
        glory: [
          "Wanderer 1",
          "Wanderer 2",
          "Wanderer 3",
          "Master 1",
          "Master 2",
          "Sage",
          "Legend",
          "Deity",
        ],
        charisma: [
          "Rabbit",
          "Wolf",
          "Lion",
          "Pegasus",
          "Gryphon",
          "Phoenics",
          "Wyrmling",
          "Wyvern",
          "Ancient dragon",
        ],
      },
      colors: ["#D3D3D3", "#ADD8E6", "#ffcccb", "#CBC3E3"],
    };
  },
  methods: {
    getLv(type) {
      let lvConst = this.lvConstants[type];
      let exp = this.info.exp[type];
      return this.getBaseLog(2, (2 * exp) / lvConst);
    },
    getLvName(type) {
      let lv = Math.floor(this.getLv(type));
      return this.levelNames[type][lv];
    },
    getLvPercent(type) {
      let curPercent = (this.getLv(type) % 1) * 100;
      return Math.round(curPercent * 10) / 10;
    },
    getBaseLog(base, x) {
      return Math.log(x) / Math.log(base);
    },
  },
  // mounted() {
  //   this.$refs.leagueColor.style.setProperty(
  //     "--league-color",
  //     this.colors[this.info.league]
  //   );
  // },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
$toMVWidth: 500px;

$cardPadding: 2rem;
$cardMargin: 1rem;

$progressUnderlay: var(--v-secondary-darken1);
$progressOverlay: var(--v-accent-base);

#gridCard {
  width: max-content;
  margin-top: 80px;
  margin-bottom: 32px;
  p {
    color: var(--v-background-darken3);
  }
  #columnsWrapper {
    @include flexbox();
    .cardColumn {
      @include flexbox(column);
      height: fit-content;
      width: 100%;
      margin-bottom: auto;
      &:not(:last-child) {
        margin-right: $cardMargin;
      }
      & > * {
        width: 100%;
      }
    }
    @media (max-width: $toMVWidth) {
      @include flexbox(column);
      .cardColumn {
        margin-right: 0 !important;
      }
    }
  }

  .boxShadowCard {
    @include box-shadow();
    height: 100%;
    margin: 0;
    padding: $cardPadding;
    border-radius: 15px;
    margin-bottom: $cardMargin;
    @include flexbox();

    p {
      width: 100%;
      height: fit-content;
      text-align: left;
      &:last-child {
        margin-bottom: 0;
      }
      span {
        float: right;
        margin-left: 1ch;
        height: 100%;
      }
    }
  }

  #lvlCard {
    ::v-deep(.v-progress-circular__underlay) {
      stroke: $progressUnderlay;
    }
    ::v-deep(.v-progress-circular__overlay) {
      stroke: $progressOverlay;
    }
    ::v-deep(.v-progress-circular__info) {
      @include flexbox(column);

      p {
        text-align: center;
        margin-bottom: 0;
      }
    }
    #lvlInfo {
      text-align: left;
      margin-left: 1.5rem;
      width: 100%;
    }
    @media (max-width: $toMVWidth) {
      @include flexbox(column);
      #lvlInfo {
        padding-top: $cardPadding;
      }
    }
  }

  .boxShadowCard:not(#lvlCard) {
    flex-direction: column;
  }

  #charismaCard {
    position: relative;
    overflow: hidden;
    .v-progress-linear {
      position: absolute;
      top: 0;

      ::v-deep(.v-progress-linear__background) {
        background-color: $progressUnderlay !important;
        opacity: 1 !important;
      }
      ::v-deep(.v-progress-linear__determinate) {
        background-color: $progressOverlay !important;
      }

      &__content {
        p {
          text-align: center !important;
        }
      }
    }
    #charismaInfo {
      width: 100%;
    }
  }

  #leagueCard {
    #leagueColor {
      position: relative;
      span {
        width: 40px;
        height: 10px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);

        border-radius: 15px;
        background: var(--league-color);
      }
    }
  }
}
</style>

