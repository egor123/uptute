<template>
  <HeaderMenu
    :color="color"
    :textColor="textColor"
    :borderRadius="borderRadius"
    :border="border"
    :padding="padding"
  >
    <template v-slot:title>
      <v-icon v-if="ifWithIcon" class="icon"> mdi-account-plus-outline </v-icon>
      <span v-if="ifWithText">{{ $l("auth.header.account") }}</span>
    </template>
    <template v-slot:content>
      <HeaderListItem
        @click="goTo('LogIn')"
        :text="$l('auth.header.sign_in')"
        justify="center"
      />
      <HeaderListItem
        @click="goTo('Register')"
        :text="$l('auth.header.sign_up')"
        justify="center"
      />
    </template>
  </HeaderMenu>
</template>

<script>
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import { goTo } from "@/plugins/utilityMethods.js";
import HeaderListItem from "./HeaderListItem";

export default {
  props: {
    ifWithText: {
      type: Boolean,
      default: true,
    },
    ifWithIcon: {
      type: Boolean,
      default: true,
    },
    color: String,
    textColor: String,
    borderRadius: String,
    border: String,
    padding: String,
  },
  components: {
    HeaderMenu,
    HeaderListItem,
  },
  methods: {
    goTo,
  },
};
</script>

<style lang="scss" scoped>
.icon.v-icon {
  color: var(--v-accent-base);
  font-size: 20px;
  padding: 4.78px !important;
  padding-right: 10px !important;
  border-radius: 50%;
  transform: translateX(0px);
}
</style>
