<template>
  <Background :title="$l('set_up.subheader')">
    <BackgroundCard>
      <div id="wrapper">
        <img id="userImg" src="@/assets/icons/user.svg" alt="" />

        <div>
          <Textarea class="motto" :label="$l('set_up.2.motto')" />
          <Textarea class="about" :label="$l('set_up.2.about')" />
        </div>

        <div id="zoomDiv">
          <TextField
            class="zoom"
            :label="$l('set_up.2.zoom')"
            imgName="zoom-icon"
          />

          <div id="dialogContainer">
            <Dialog>
              <template v-slot:object>
                <button id="dialog">
                  ?
                </button>
              </template>

              <template v-slot:title id="title">
                {{ $l("set_up.2.dialog.title") }}
              </template>

              <template v-slot:text>
                {{ $l("set_up.2.dialog.text") }}
                <a
                  target="_blank"
                  href="https://support.zoom.us/hc/en-us/articles/201362843-Personal-meeting-ID-PMI-and-personal-link"
                >
                  {{ $l("set_up.2.dialog.link") }}</a
                >
              </template>
            </Dialog>
          </div>
        </div>

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
      </div>
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

import Dialog from "@/components/Dialog.vue";
import Textarea from "@/components/textInput/Textarea.vue";
import TextField from "@/components/textInput/TextField.vue";

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

    Dialog,
    Textarea,
    TextField,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

::v-deep #backgroundCard {
  max-width: 25rem !important;
  background: #ffffff00;
  padding: 0;
}

#wrapper > *:not(:last-child) {
  margin-bottom: 2rem;
}

.motto {
  border-radius: 15px 15px 0 0;
}

.about {
  border-radius: 0 0 15px 15px;
}

#zoomDiv {
  position: relative;
  .zoom {
    border-radius: 15px;
  }

  #dialogContainer {
    position: absolute;
    left: 105%;
    top: 50%;
    transform: translateY(-50%);

    #dialog {
      @include box-size(30px);
      border-radius: 50%;
      color: var(--v-secondary-darken2);

      transition: color 300ms ease-in-out;
      &:hover {
        color: var(--v-secondary-darken3);
      }
    }
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
  cursor: pointer;

  transition: box-shadow 400ms;
  &:hover {
    box-shadow: 1px 2px 5px 2.5px var(--v-primary-lighten4);
  }
}
</style>
