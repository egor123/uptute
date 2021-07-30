<template>
  <Background :title="$l('choose_a.tutor.header')">
    <div class="innerContent">
      <LessonInfo class="lessonInfo" />
      <InfoCardBase class="infoCard">
        <h3 class="chooseOne">{{ $l("choose_a.tutor.choose") }}</h3>
      </InfoCardBase>
      <Searching />
      <FilterPanel id="filterPanel">
        <ExpandableSortBy
          v-model="filter"
          :filters="[
            { name: 'rating', dir: 'up' },
            { name: 'price', dir: 'up' },
            { name: 'hours_taught', dir: 'up' },
          ]"
          :label="$l('find.filters.filters.h')"
          :text="
            `${$l('find.filters.filters.' + filter.name)} ${
              filter.dir === 'up' ? '↑' : '↓'
            }`
          "
          :convertor="(item) => $l('find.filters.filters.' + item.name)"
        />
      </FilterPanel>
      <Panels id="panels" :tutors="$store.getters.getTutors" />
    </div>
    <v-snackbar max-width="800" color="error" timeout="-1" v-model="showAlert">
      {{ $l("choose_a.tutor.ended") }}
      <div id="snackButtons">
        <v-btn text v-model="closeButton" ref="closeBtn">
          {{ $l("choose_a.tutor.anyway") }}
        </v-btn>
        <v-btn text v-model="backButton" ref="backBtn">
          {{ $l("choose_a.tutor.cancel") }}
        </v-btn>
      </div>
    </v-snackbar>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";
import InfoCardBase from "@/components/choosing/infoCards/InfoCardBase.vue";
import Panels from "@/components/choosing/choosingATutor/Panels";
import Searching from "@/components/choosing/Searching.vue";
import LessonInfo from "@/components/choosing/infoCards/LessonInfo.vue";
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableSortBy from "@/components/filterPanel/ExpandableSortBy.vue";

export default {
  permisions: {
    roles: "USER",
    allowedOrigins: "FindATutor",
    redirect: "FindATutor",
  },
  components: {
    Background,
    InfoCardBase,
    Panels,
    Searching,
    LessonInfo,
    FilterPanel,
    ExpandableSortBy,
  },
  data() {
    return {
      filter: { name: "rating", dir: "up" },
      showAlert: false,
      closeButton: false,
      backButton: false,
    };
  },
  methods: {
    preventNav(event) {
      event.preventDefault();
      event.returnValue = "";
    },
    untilClick() {
      return new Promise((res) => {
        const backBtn = this.$refs.backBtn.$el;
        const closeBtn = this.$refs.closeBtn.$el;
        backBtn.onclick = () => res("back");
        closeBtn.onclick = () => res("close");
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.showAlert = true;
    this.untilClick().then((val) => {
      this.showAlert = false;
      if (val === "close") next();
    });
  },
  mounted() {
    window.addEventListener("beforeunload", this.preventNav);
    this.$store.dispatch("startSearch", null);
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
$inner-content-width: 350px;

::v-deep .v-snack__wrapper {
  border-radius: 15px !important;
  .v-snack__content {
    @include flexbox(column);
  }
  #snackButtons .v-btn {
    border-radius: 15px !important;
    margin: 0.5rem 0.5rem 0 0.5rem;
  }
}

.innerContent {
  margin: calc(106px + 3rem) auto auto auto;
  width: $inner-content-width;
}

#filterPanel {
  margin-bottom: 2rem;
}

#panels {
  margin-bottom: 3rem;
}

@media (max-width: 400px) {
  .innerContent {
    width: 100vh;
    padding: 0 1rem;
  }
}

@media (max-width: 330px) {
}

@media (max-width: 300px) {
}

::v-deep {
  @media (max-width: 1200px) {
    .lessonInfo {
      &.baseCard {
        border-radius: 15px 15px 0 0;
        position: static;
      }

      position: static;
    }
    .infoCard {
      &.baseCard {
        border-radius: 0 0 15px 15px;
      }
    }
  }
}

.chooseOne {
  font-size: 1rem;
  font-weight: normal;
  color: var(--v-primary-lighten4);
  text-align: center;
}
</style>
