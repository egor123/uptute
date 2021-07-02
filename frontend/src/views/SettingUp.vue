<template>
  <Background :title="$l('set_up.subheader')">
    <BackgroundCard>
      <img id="userImg" src="@/assets/icons/user.svg" alt="" />
      <v-card color="#ffffff00" flat>
        <v-row class="d-flex justify-center">
          <v-col cols="6" class="pa-0">
            <v-textarea
              class="motto"
              :label="$l('set_up.2.motto')"
              auto-grow
              filled
              rounded
              rows="1"
              row-height="16"
            />
            <v-text-field
              class="zoom"
              :label="$l('set_up.2.zoom')"
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-expansion-panels
        flat
        hover
        focusable
        id="panels"
        v-for="i in 1"
        :key="i"
      >
        <Age ref="component" />
        <Subjects ref="component" />
        <Audience ref="component" />
        <Languages ref="component" />
        <Price ref="component" />
      </v-expansion-panels>
    </BackgroundCard>
  </Background>
</template>

<script>
import Background from "@/components/background/Background.vue";
import BackgroundCard from "@/components/background/BackgroundCard.vue";

import Age from "@/components/sidepanel/Age.vue";
import Subjects from "@/components/sidepanel/Subjects.vue";
import Audience from "@/components/sidepanel/Audience.vue";
import Languages from "@/components/sidepanel/Languages.vue";
import Price from "@/components/sidepanel/Price.vue";

export default {
  name: "SettingUp",
  path: "/setting_up",
  permisions: {
    roles: "USER",
    redirect: "Register",
  },
  components: {
    Background,
    BackgroundCard,

    Age,
    Subjects,
    Audience,
    Languages,
    Price,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

::v-deep #backgroundCard {
  max-width: 25rem !important;
  background: #ffffff00;
  #contentWrapper {
    padding: 0;
  }
}

#panels {
  border-radius: 15px;
}

#userImg {
  @include box-size(100px);

  border-radius: 50%;
  border: 2px solid var(--v-primary-base);
  opacity: 0.2;

  transition: box-shadow 400ms;
  &:hover {
    box-shadow: 1px 2px 5px 2.5px var(--v-primary-lighten4);
  }
}
</style>
