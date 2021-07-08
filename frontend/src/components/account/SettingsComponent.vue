<template>
  <div id="wrapper">
    <img id="userImg" src="@/assets/icons/user.svg" alt="" />

    <div>
      <Textarea class="motto" :label="$l('set_up.motto')" />
      <Textarea class="about" :label="$l('set_up.about')" />
    </div>

    <div id="zoomDiv">
      <TextField class="zoom" :label="$l('set_up.zoom')" imgName="zoom-icon" />

      <div id="dialogContainer">
        <Dialog>
          <template v-slot:object>
            <button id="dialog">
              ?
            </button>
          </template>

          <template v-slot:title id="title">
            {{ $l("set_up.dialog.title") }}
          </template>

          <template v-slot:text>
            {{ $l("set_up.dialog.text") }}
            <a
              target="_blank"
              href="https://support.zoom.us/hc/en-us/articles/201362843-Personal-meeting-ID-PMI-and-personal-link"
            >
              {{ $l("set_up.dialog.link") }}</a
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
      <Birth ref="component" />
      <SubjectsYouTeach ref="component" />
      <Audience ref="component" />
      <Languages ref="component" />
      <YourPrice ref="component" />
    </v-expansion-panels>
  </div>
</template>

<script>
import Birth from "@/components/sidepanel/Birth.vue";
import SubjectsYouTeach from "@/components/sidepanel/SubjectsYouTeach.vue";
import Audience from "@/components/sidepanel/Audience.vue";
import Languages from "@/components/sidepanel/Languages.vue";
import YourPrice from "@/components/sidepanel/YourPrice.vue";

import Dialog from "@/components/dialogs/Dialog.vue";
import Textarea from "@/components/textInput/Textarea.vue";
import TextField from "@/components/textInput/TextField.vue";

export default {
  components: {
    Birth,
    SubjectsYouTeach,
    Audience,
    Languages,
    YourPrice,

    Dialog,
    Textarea,
    TextField,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  width: 25rem;
  @media (max-width: 450px) {
    width: 100%;
    padding: 0 1rem;
  }

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
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
    left: 102%;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 450px) {
      left: 84%;
      top: 50%;
      transform: translateY(-50%);
    }

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
