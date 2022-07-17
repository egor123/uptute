<template>
  <HeaderMenu
    :color="color"
    :textColor="textColor"
    :borderRadius="borderRadius"
    :border="border"
    :padding="padding"
  >
    <template v-slot:title>
      <v-icon v-if="ifWithIcon" id="lessonIcon">
        mdi-book-open-page-variant-outline
      </v-icon>
      <span v-if="ifWithText"> {{ $l("app.header.lesson.title") }}</span>
    </template>
    <template v-slot:content>
      <HeaderListItem
        @click="goTo('FindATutor')"
        icon="mdi-school"
        :text="$l('app.header.lesson.learn')"
      />
      <HeaderListItem
        @click="goTo('ChooseAStudent')"
        icon="mdi-human-male-board"
        :text="$l('app.header.lesson.teach')"
      />
    </template>
  </HeaderMenu>
</template>

<script>
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import { goTo } from "@/plugins/utilityMethods.js";
import HeaderListItem from "./HeaderListItem";

export default {
  components: {
    HeaderMenu,
    HeaderListItem,
  },
  methods: {
    goTo,
  },
  props: {
    ifWithText: {
      type: Boolean,
      default: true,
    },
    ifWithIcon: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "#000",
    },
    textColor: {
      type: String,
      default: "var(--v-background-base)",
    },
    borderRadius: {
      type: String,
      default: "0 0 15px 15px",
    },
    border: {
      type: String,
      default: null,
    },
    padding: {
      type: String,
      default: "0px",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.v-icon#lessonIcon {
  // color: #000;
  // background: var(--v-background-base);
  color: var(--v-accent-base);
  font-size: 20px;
  padding: 4.78px !important;
  padding-right: 10px !important;
  border-radius: 50%;
  transform: translateX(0px);
}
span {
  @include hoverOpacity();
}
.v-icon {
  color: inherit !important;
}
</style>

