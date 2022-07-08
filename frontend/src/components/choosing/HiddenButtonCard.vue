<template>
  <div id="hiddenButtonCard">
    <slot name="static" />
    <div id="moving" v-if="ifMounted" :style="`--nudge: ${activatorH}px`">
      <slot name="moving" />
    </div>
    <div id="activator" ref="activatorRef">
      <slot name="activator" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";

@Component
export default class HiddenButtonCard extends Vue {
  @Ref() readonly activatorRef!: HTMLDivElement;

  ifMounted: boolean = false;

  get activatorH() {
    return this.activatorRef?.clientHeight || 52;
  }

  mounted() {
    this.$nextTick(() => (this.ifMounted = true));
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#hiddenButtonCard {
  position: relative;
  cursor: default;
  background-color: var(--v-card-base);
  @include box-shadow();
  border-radius: 15px;
  padding: 15px;

  @include from-left();

  & > *:not(:first-child) {
    padding-top: 15px;
  }

  &:hover {
    #moving {
      transition: transform 0.6s ease;
    }
    #activator {
      opacity: 1;
      pointer-events: all;
      transition: opacity 0.5s ease 0.1s;
    }
  }

  &:not(:hover) {
    #moving {
      transform: translateY(var(--nudge));
      transition: transform 0.5s ease 0.2s;
    }
    #activator {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
    }
  }
}
</style>

