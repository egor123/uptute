<template>
  <div id="zoomDiv">
    <TextField
      :value="value"
      @input="emit"
      :isError="isError"
      :errMsg="isError.msg"
      class="zoom"
      :label="$l('set_up.zoom')"
      img="zoom-icon"
    />

    <div id="dialogContainer">
      <DialogCustom>
        <template v-slot:object>
          <button id="dialog">?</button>
        </template>

        <template v-slot:title>
          {{ $l("set_up.dialog.title") }}
        </template>

        <template v-slot:text>
          {{ $l("set_up.dialog.text") }}
          <a
            target="_blank"
            href="https://support.zoom.us/hc/en-us/articles/201362843-Personal-meeting-ID-PMI-and-personal-link"
          >
            {{ $l("set_up.dialog.link") }}
          </a>
        </template>
      </DialogCustom>
    </div>
  </div>
</template>

<script lang="ts">
import TextField from "@/components/filterPanel/TextField.vue";
import DialogCustom from "@/components/global/Dialog.vue";

import FieldClass from "@/utility/classes/abstract/vue/Field.vue";

import { Component } from "vue-property-decorator";
@Component({ components: { TextField, DialogCustom } })
export default class LinkField extends FieldClass<string> {}
</script>

<style lang="scss">
@import "@/scss/mixins.scss";

#zoomDiv {
  position: relative;
  width: 100%;

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
</style>
